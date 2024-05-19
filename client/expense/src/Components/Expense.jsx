import axios from 'axios'
import React, { useCallback, useMemo, useState } from "react"
import { useQuery } from 'react-query'
import axiosInstance from "../Fetch/AxiosConfig"
import { useNavigate } from "react-router-dom"
import Tesseract from "tesseract.js"
//Notificaton
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//FetchData
import { fetchBudget, fetchCategory, fetchExpenses } from "../Fetch/FetchData"

import Button from '../Atoms/Button'
import FileInput from '../Atoms/FileInput'
import Flex from "../Atoms/Flex"
import Form from '../Atoms/Form'
import Heading from '../Atoms/Heading'
import Input from '../Atoms/Input'
import Label from '../Atoms/Label'
import Layout from "../Atoms/Layout"
import Select from "../Atoms/Select"
import Topbar from '../Atoms/Topbar'
import DataDialog from "../Molecules/DataDialog"
import Dialog from '../Molecules/FileDialog'
import Modal from "../Molecules/Modal"
import Table from '../Molecules/Table'
import Sidebar from './Sidebar'
import Confirmation from '../Atoms/Confirmation'
import SearchBar from '../Atoms/SearchBar'


const aiModelMap = (text) => {



    return {
        contents: [{
            parts: [{
                text:
                    'Please extract the Amount, Category, and Date from the provided text. Return the information as a list of maps . Ensure that the output does not include triple-coded JSON or triple-coded backticks JSON and remove any JSON markdown. Each map should contain non-null values for the keys Amount, Category, and Date.' + text

            }]
        }]
    }



}


const Expense = () => {
    const userId = localStorage.getItem("userId")

    /* const [Loading, setLoading] = useState(true)
        const navigate = useNavigate()
        const [cookies] = useCookies(['token']);
        const token = cookies.token;
        console.log(token)
    
        useQuery("verifyToken", () => verifyToken(token), {
            onSuccess: () => {
                setLoading(false)
            },
            onError: (error) => {
                console.log(error)
                navigate("/");
                setLoading(false)
    
            },
        });
    
        if (Loading) {
            return <Spinner></Spinner>
        } */

    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }

    const [columns, setColumns] = useState([
        { 'id': 0, 'headerName': 'Date', 'columnName': 'expenseDate', 'sortUp': false, 'sortDown': false, 'dateColumn': true, 'moneyColumn': false },
        { 'id': 1, 'headerName': 'Category', 'columnName': 'expenseCategory', 'sortUp': false, 'sortDown': false, 'dateColumn': false, 'moneyColumn': false },
        { 'id': 2, 'headerName': 'Amount', 'columnName': 'expenseAmount', 'sortUp': false, 'sortDown': false, 'dateColumn': true, 'moneyColumn': true }
    ])

    //Fetch Category AND Budget;

    const { data: budgetData, isLoading: budgetLoading, error: budgetError } = useQuery(
        "budgetType",
        () => fetchBudget(),
        {
            dataKey: "budgetType",
        }
    );
    //Fetch Category
    const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useQuery(
        'categoryData',
        () => fetchCategory(),
        {
            dataKey: "categoryType",
        }
    );

    const memoizedBudgetData = useMemo(() => !budgetData ? [] : budgetData, [budgetData]);
    const memoizedCategoryData = useMemo(() => categoryData, [categoryData]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('expenseDate');
    const [sortOrder, setSortOrder] = useState('desc');

    //Fetch Data
    const { data: expenses, isLoading, error, refetch } = useQuery(
        ["expense", { sortBy, sortOrder, searchTerm }],
        () => fetchExpenses(sortBy, sortOrder, searchTerm),
        {
            dataKey: "expense",
        }
    );

    // Function to highlight matched words in a string
    const highlightMatchedWords=(text, searchTerm) =>{
        console.log(typeof text)
        console.log(typeof searchTerm)

        if (!searchTerm || !text) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        console.log(parts)

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <span className="bg-green-400" key={index}>{part}</span>;
            } else {
                return part;
            }
        });
    }


    const memoizedExpenses = useMemo(() => {
        if (!expenses) return [];

        const hightlightedExpenseData = expenses.map(expense => {
            return {
                ...expense,
                expenseCategory: highlightMatchedWords(expense.expenseCategory, searchTerm),
                formattedExpenseDate: highlightMatchedWords(expense.formattedExpenseDate, searchTerm),
                formattedExpenseAmount: highlightMatchedWords(expense.formattedExpenseAmount, searchTerm)

            };
        })
        return hightlightedExpenseData;
    }, [expenses, searchTerm]);


    // Sorting
    const handleSortUp = useCallback((sortColumn, index) => {
        setSortBy(sortColumn)
        setSortOrder('asc')
        const updateColumn = columns.map((item, i) => ({
            ...item,
            'sortUp': i === index ? true : false,
            'sortDown': false
        }
        ))
        setColumns(updateColumn)
    }, [columns, refetch])


    const handleSortDown = useCallback((sortColumn, index) => {
        setSortBy(sortColumn)
        setSortOrder('desc')
        const updateColumn = columns.map((item, i) => ({
            ...item,
            'sortUp': false,
            'sortDown': i === index ? true : false
        }
        ))
        setColumns(updateColumn)

    }, [columns, refetch])


    const [openConfirm, setConfirm] = useState(false)
    const [editMode, setEditMode] = useState(false)

    // Form Inputs
    const [id, setId] = useState('')
    const [Amount, setAmount] = useState(0);
    const [Category, setCategory] = useState('');
    const [Date, setDate] = useState('');
    const [BudgetType, setBudgetType] = useState("");


    const confirmationDialog = (e) => {
        e.preventDefault();
        setConfirm(true)
    }

    const handleSave = async () => {
        setConfirm(false)
        try {
            if (Category.trim() === '' || Date.trim() === '' || Amount === 0 || BudgetType.trim() === '') {
                return
            }
            const response = await axiosInstance.post("http://localhost:3001/saveExpense", { 'Amount': Amount, 'Category': Category, "Date": Date, "Budget": BudgetType, 'userId': userId })
            const { message } = response.data
            toast.success(message)

        } catch (error) {
            console.log("Message : " + error.message)
            toast.error(error.message)

        }

        setAmount(0);
        setCategory('')
        setDate('')
        setBudgetType('')
        closeModal();
        refetch();
    }

    const handleUpdate = async () => {
        try {
            if (Category.trim() === '' || Date.trim() === '' || Amount === 0 || BudgetType.trim() === '') {
                return
            }
            setConfirm(false)
            const response = await axiosInstance.post("http://localhost:3001/updateExpense", { 'expenseId': id, 'Amount': Amount, 'Category': Category, "Date": Date, "Budget": BudgetType, 'userId': userId })
            const { message } = response.data
            toast.success(message)

        } catch (error) {
            console.log("Message : " + error)
            toast.error(error.message)

        }
        setAmount(0);
        setId('')
        setCategory('')
        setDate('')
        setBudgetType('')
        closeModal();
        refetch();
    }

    //handleDelete
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [idToDelete, setIdToDelete] = useState('')
    const deleteConfirmation = (id) => {
        console.log(id)
        setIdToDelete(id)
        setDeleteConfirm(true)
    }

    const handleDelete = async () => {
        console.log("API Started")
        setDeleteConfirm(false)
        try {
            const response = await axiosInstance.delete("http://localhost:3001/deleteExpense", {
                params: {
                    "expenseId": idToDelete
                }
            })
            const { message } = response.data
            toast.success(message)
        } catch (error) {
            toast.error(error.message)
        }
        refetch()
    }


    // Model Open
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)

    }
    const closeModal = () => {
        resetForm()
        setIsOpen(false)
    }


    const resetForm = () => {
        setEditMode(false)
        setAmount(0)
        setCategory('')
        setDate('')
        setBudgetType('')
    }
    const handleAddMode = () => {
        openModal();

    }
    const handleEditMode = (data) => {
        setEditMode(true)
        openModal()
        setId(data.expenseId)
        setAmount(data["expenseAmount"])
        setCategory((data["expenseCategory"]))
        setBudgetType((data["budgetType"]))
        setDate(data["expenseDate"].toString().split("T")[0])

    }



    //AI Result
    const [aiResult, setAiResult] = useState([]);
    const [dataDialog, setDataDialog] = useState(false);
    const handleDataDialog = () => {
        setDataDialog(!dataDialog)
    }
    console.log(aiResult)

    const aiResultFunction = (result) => {
        console.log(typeof result); // This will log the type of myState

        const updatedResult = result.map((item, i) => ({
            ...item,
            "checkBox": true,
        })
        )
        setAiResult(updatedResult)
    }


    // AI FILE ANALYSIS
    const [fileDialogOpen, setFileDialogOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [analysisStage, setAnalysisStage] = useState('')
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

    };
    const handlefileDialog = () => {
        setFileDialogOpen(!fileDialogOpen)
    }


    const FileAnalysis = async () => {
        if (selectedFile) {
            try {
                console.log("File Analysis Started")
                setAnalysisStage("Extracting Text")
                setAnalysisStarted(true)
                const { data: { text } } = await Tesseract.recognize(
                    selectedFile,
                    'eng',

                    //  { logger: info => console.log(info) }
                );
                console.log("File Analysis Ended")

                const aiMap = aiModelMap(text)

                console.log("Ai Analysis Started")

                setAnalysisStage("Analysing Text")
                const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAGXLt6HZQ5rFnmTW_YCYOxVHi516MEXJ8 ", aiMap)
                const textValue = response.data.candidates[0]?.content?.parts[0]?.text || "";

                console.log(typeof textValue)
                console.log(textValue)
                const jsonStr = textValue.replace(/^```json\n|```$/g, '');
                const parsedObject = JSON.parse(jsonStr);
                console.log(typeof parsedObject)
                setAiResult(parsedObject || [])
                handleDataDialog()

                console.log("Ai Analysis Ended")

            } catch (error) {
                console.error('OCR Error:', error);
                console.log("File Analysis Ended")

            }
            setAnalysisStarted(false)
        }

    }


    return (
        <>

            <ToastContainer position="bottom-right" />
            <Sidebar display={sideBar} active='Expense' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>
                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col gap-1 p-4 sm:p-1 sm:text-mobile'>
                    <Heading heading='Expense' />
                    <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Expense' inputStyle='border-2 mt-0.5 p-2 w-full sm:py-1  outline-none focus:border-blue-200' />

                    { /* <Button onClick={handleSearch} ButtonStyle="px-3 py-2 sm:px-2  sm:py-1 bg-regalBlue rounded" disabled={searchTerm === "" ? true : false}>Search</Button> */}
                    <Flex flexStyle='gap-10 sm:justify-between text-mobile mt-1 '>
                        <Button ButtonStyle="px-3  sm:px-2 sm:py-1 bg-teal-500 text-black  rounded" onClick={handlefileDialog} >ai analysis</Button>

                        <Button ButtonStyle="px-3 py-2 sm:px-2 sm:py-1 bg-regalBlue rounded" onClick={handleAddMode} ><i className="fa fa-plus pe-2"></i>add Expense</Button>
                    </Flex>

                </Flex >
                <Layout layoutStyle='h-full w-full px-4 sm:px-1'>
                    <Table data={memoizedExpenses || []}
                        primaryKey="expenseId" columns={columns} isLoading={isLoading} handleSortUp={handleSortUp} handleSortDown={handleSortDown} onEdit={handleEditMode} onDelete={deleteConfirmation} />

                </Layout>


            </Layout >

            {isOpen &&
                <Modal heading={editMode ? "expense" : "add expense"} isOpen={isOpen} close={closeModal}>

                    <Flex flexStyle='flex-col px-3 sm:px-1 sm:text-sm'>

                        {
                        /**editMode ?
                            <>
                            </> : <>
                                <Flex flexStyle='flex-col items-end pt-1'>
                                    <Button ButtonStyle="h-6 w-24 bg-teal-500 text-black text-[14px]  rounded" onClick={handlefileDialog} >ai analysis</Button>
                                </Flex>
                            </>
            */}
                        <Form onSubmit={confirmationDialog}>
                            <Input type='number' labelText="Amount" value={Amount} onChange={(e) => setAmount(e.target.value)} inputStyle=' h-8  sm:px-1 w-full px-2 border-2  focus:border-regalBlue' />
                            <Input type='text' labelText="Category" value={Category} onChange={(e) => setCategory(e.target.value)} inputStyle='h-8  sm:px-1 w-full px-2 border-2  focus:border-regalBlue' />
                            <Input type='date' labelText='Date' value={Date} onChange={(e) => setDate(e.target.value)} inputStyle='h-8 px-2 sm:px-1 focus:border-regalBlue border-2 w-full  text-sm ' />
                            <Label labelText="Budget Type" />
                            <Select value={BudgetType} data={memoizedBudgetData} onChange={(e) => setBudgetType(e.target.value)} Style='h-8 border-2 text-sm ' />
                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue  rounded sm:py-1 my-3 sm:text-sm'>{editMode ? "update" : "add"}</Button>
                        </Form>
                    </Flex>
                </Modal>}


            {openConfirm && <Confirmation handleFunction={editMode ? handleUpdate : handleSave} close={() => setConfirm(false)} message={editMode ? "Do you want to update the expense?" : "Do you want to save the expense?"} />}

            {deleteConfirm && <Confirmation handleFunction={handleDelete} close={() => setDeleteConfirm(false)} message={"Do you want to delete the expense?"} />}


            {
                fileDialogOpen &&
                <Dialog isOpen={fileDialogOpen} close={handlefileDialog} isLoading={analysisStarted} text={analysisStage}>


                    <Flex flexStyle='flex-col justify-center items-center'>
                        <Layout layoutStyle='pb-2 px-2'>
                            <FileInput handleFileChange={handleFileChange}></FileInput>

                        </Layout>
                        {selectedFile && (

                            <Layout layoutStyle='text-center px-2'>
                                <Button onClick={() => FileAnalysis()} ButtonStyle='px-2 mb-4 bg-regalBlue rounded-lg'>!</Button>
                                <p>{selectedFile.name}</p>
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    style={{ 'height': '100%', "width": '100%' }}

                                />
                            </Layout>

                        )}
                    </Flex>
                </Dialog>
            }

            {
                dataDialog && <DataDialog isOpen={dataDialog} close={handleDataDialog}>
                    {dataDialog && aiResult.map((item, index) => (
                        <div className="flex gap-4">
                            <input type="checkbox" defavalue={true} className="" />
                            <input type="text" value={aiResult[Amount]} />
                            <input type="text" value={aiResult[Category]} />
                            <input type="text" value={aiResult[Date]} />
                        </div>
                    ))}



                </DataDialog>
            }
        </>


    )
}

export default Expense;







