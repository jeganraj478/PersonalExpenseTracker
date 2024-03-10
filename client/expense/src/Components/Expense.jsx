import React, { useState, useMemo, useCallback } from "react"
import { useQuery } from 'react-query'
import axios from 'axios'
import Tesseract from "tesseract.js"

import { fetchCategory, fetchExpenses, fetchBudget } from "../Query/Query"

import Sidebar from './Sidebar'
import Topbar from '../Atoms/Topbar'
import Flex from "../Atoms/Flex"
import Heading from '../Atoms/Heading'
import Button from '../Atoms/Button'
import Modal from "../Molecules/Modal"
import Input from '../Atoms/Input'
import Label from '../Atoms/Label'
import Select from "../Atoms/Select"
import Table from '../Molecules/Table'
import Layout from "../Atoms/Layout"
import Form from '../Atoms/Form'
import Dialog from '../Molecules/FileDialog'
import FileInput from '../Atoms/FileInput'
import DataDialog from "../Molecules/DataDialog"



const aiModelMap = (text) => {



    return {
        contents: [{
            parts: [{
                text: "Extract the Amount,Category,Date from the below text and the return as a JSON with keys Amount,Category,Date." + text

            }]
        }]
    }



}


const Expense = () => {

    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }



    const [columns, setColumns] = useState([
        { 'id': 0, 'headerName': 'Date', 'columnName': 'expenseDate', 'sortUp': false, 'sortDown': false, 'dateColumn': true, 'moneyColumn': false },
        { 'id': 1, 'headerName': 'Category', 'columnName': 'expenseCategory', 'sortUp': false, 'sortDown': false, 'dateColumn': false, 'moneyColumn': false },
        { 'id': 2, 'headerName': 'Amount', 'columnName': 'expenseAmount', 'sortUp': false, 'sortDown': false, 'dateColumn': true, 'moneyColumn': true }
    ])


    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('expenseDate');
    const [sortOrder, setSortOrder] = useState('desc');



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

    //Fetch Data
    const { data: expenses, isLoading, error, refetch } = useQuery(
        ["expense", { sortBy, sortOrder }],
        () => fetchExpenses(sortBy, sortOrder, searchTerm),
        {
            dataKey: "expense",
        }
    );

    const memoizedBudgetData = useMemo(() => budgetData, [budgetData]);
    const memoizedCategoryData = useMemo(() => categoryData, [categoryData]);
    const memoizedExpenses = useMemo(() => expenses, [expenses]);



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



    // Form Inputs
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    const [Amount, setAmount] = useState(0);
    const [Category, setCategory] = useState('');
    const [Date, setDate] = useState('');
    const [BudgetType, setBudgetType] = useState("");

    const handleSave = async (e) => {
        try {
            e.preventDefault()
            console.log(BudgetType)
            if (Category.trim() === '' || Date.trim() === '' || Amount === 0 || BudgetType.trim() === '') {
                return
            }
            await axios.post("http://localhost:3001/saveExpense", { 'Amount': Amount, 'Category': Category, "Date": Date, "Budget": BudgetType, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error.message)
        }

        setAmount(0);
        setCategory('')
        setDate('')
        setBudgetType('')
        closeModal();
        refetch();
    }

    const handleUpdate = async (e) => {
        try {
            console.log(id, Amount, Date, BudgetType)
            e.preventDefault()
            if (Category.trim() === '' || Date.trim() === '' || Amount === 0 || BudgetType.trim() === '') {
                return
            }
            await axios.post("http://localhost:3001/updateExpense", { 'expenseId': id, 'Amount': Amount, 'Category': Category, "Date": Date, "Budget": BudgetType, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error)
        }
        setAmount(0);
        setId('')
        setCategory('')
        setDate('')
        setBudgetType('')
        closeModal();
        refetch();
    }


    const handleDelete = async (id) => {
        console.log("API Started")
        try {
            const res = await axios.delete("http://localhost:3001/deleteExpense", {
                params: {
                    "expenseId": id
                }
            })
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }
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

        console.log(BudgetType)

    }

    const handleSearch = () => {
        refetch()
    }




    // AI FILE ANALYSIS

    const [fileDialogOpen, setFileDialogOpen] = useState(false)


    const handlefileDialog = () => {
        setFileDialogOpen(!fileDialogOpen)
    }
    const [dataDialog,setDataDialog]=useState(true);
    const handleDataDialog=()=>{
        setDataDialog(!dataDialog)
    }


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

    };

    const [extractedText, setExtractedText] = useState('');
    const [analysisStarted, setAnalysisStarted] = useState(false);
    const [analysisStage, setAnalysisStage] = useState('')


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

                setExtractedText(text);

                const aiMap = aiModelMap(text)

                console.log("Ai Analysis Started")
                setAnalysisStage("Analysing Text")

                try {
                    await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAGXLt6HZQ5rFnmTW_YCYOxVHi516MEXJ8 ", aiMap).then((response) => {
                        const textValue = response.data.candidates[0]?.content?.parts[0]?.text || '';
                        console.log(textValue)
                        handleDataDialog()



                    })
                }
                catch (error) {
                    console.log(error)
                }
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
            <Sidebar display={sideBar} active='Expense' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>
                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col p-5 sm:p-1 '>
                    <Heading heading='Expense' />
                    <Flex flexStyle='justify-between lg:flex-col lg:gap-2 sm:pt-3 sm:pb-3 pt-5 pb-7 overflow-x-hidden'>
                        <Layout layoutStyle='flex gap-2'>
                            <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Expense' inputStyle='border-2 px-2 w-full rounded-sm  outline-none focus:border-blue-200' ></Input>
                            <Button onClick={handleSearch} ButtonStyle="px-3 py-2 sm:px-2  sm:py-1 bg-regalBlue rounded" disabled={searchTerm === "" ? true : false}>Search</Button>
                        </Layout>
                        <Flex flexStyle='gap-10 flex-wrap'>
                        <Button ButtonStyle="px-3 bg-teal-500 text-black text-[14px]  rounded" onClick={handlefileDialog} >ai analysis</Button>

                        <Button ButtonStyle="px-3 py-2 sm:px-2 sm:py-1 bg-regalBlue rounded" onClick={handleAddMode} ><i className="fa fa-plus pe-2"></i>add Expense</Button>
</Flex>
                    </Flex>

                    <Table data={memoizedExpenses || []} primaryKey="expenseId" columns={columns} isLoading={isLoading} handleSortUp={handleSortUp} handleSortDown={handleSortDown} onEdit={handleEditMode} onDelete={handleDelete} />


                </Flex>
            </Layout>

            {isOpen &&
                <Modal heading={editMode ? "expense" : "add expense"} isOpen={isOpen} close={closeModal}>

                    <Flex flexStyle='flex-col px-3 sm:px-1 sm:text-sm'>
                        {editMode ?
                            <>
                            </> : <>
                                <Flex flexStyle='flex-col items-end pt-1'>
                                    <Button ButtonStyle="h-6 w-24 bg-teal-500 text-black text-[14px]  rounded" onClick={handlefileDialog} >ai analysis</Button>
                                </Flex>
                            </>
                        }
                        <Form onSubmit={editMode ? handleUpdate : handleSave}>
                            <Flex flexStyle='flex-col py-2 sm:py-1'>
                                <Label labelText="Amount" />
                                <Input type='number' value={Amount} onChange={(e) => setAmount(e.target.value)} inputStyle=' h-8  sm:px-1 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Flex flexStyle='flex-col py-2 sm:py-1 '>
                                <Label labelText="Category" />
                                <Input type='text' value={Category} onChange={(e) => setCategory(e.target.value)} inputStyle='h-8  sm:px-1 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Flex flexStyle='flex-col py-2 sm:py-1'>
                                <Label labelText='Date' />
                                <Input type='date' value={Date} onChange={(e) => setDate(e.target.value)} inputStyle='h-8 px-2 sm:px-1 focus:border-regalBlue border-2 w-full rounded-sm text-sm ' />
                            </Flex>
                            <Flex flexStyle='flex-col py-2 sm:py-1'>
                                <Label labelText="Budget Type" />
                                <Select value={BudgetType} data={memoizedBudgetData || []} onChange={(e) => setBudgetType(e.target.value)} Style='h-8  border-2 text-sm rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue  rounded sm:py-1 my-3 sm:text-sm'>{editMode ? "update" : "add"}</Button>
                        </Form>
                    </Flex>
                </Modal>}




            {fileDialogOpen &&
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




                </Dialog>}



                {dataDialog && <DataDialog isOpen={dataDialog}>
                    {data.map((item,index)=>(
                        <>
                        <input type="checkbox" value={item.checkbox} />
                        <input type="text" value={item.checkbox} />
                        <input type="text" value={item.checkbox} />

                        <input type="text" value={item.checkbox} />


                        </>
                    ))
                    }
                    
                    </DataDialog>}
        </>


    )
}

export default Expense







