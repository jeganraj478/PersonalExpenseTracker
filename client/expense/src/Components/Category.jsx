import React, { useCallback, useMemo, useState } from "react"
import { useQuery } from "react-query"
import axiosInstance from "../Fetch/AxiosConfig";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './Sidebar'
import Topbar from '../Atoms/Topbar'
import Flex from "../Atoms/Flex"
import Heading from '../Atoms/Heading'
import Button from '../Atoms/Button'
import Modal from "../Molecules/Modal"
import Input from '../Atoms/Input'
import Form from '../Atoms/Form'
import Table from '../Molecules/Table'
import Layout from "../Atoms/Layout"
import Confirmation from '../Atoms/Confirmation'
import SearchBar from '../Atoms/SearchBar'


import { fetchCategory } from "../Fetch/FetchData"





const Category = () => {
    const userId = localStorage.getItem("userId")


    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }

    /**  const [CategoryList, setCategoryList] = useState([])
      useEffect(() => {
  
          const FetchCategorys = async () => {
              try {
                  await axios.get("http://localhost:3001/fetchAllCategory", {})
                  console.log("API Call Started")
              } catch (error) {
                  console.log("Error Message", error)
              }
              console.log("API Call Ended")
  
          }
  
          FetchCategorys()
      }, [CategoryList])
  */


    const [columns, setColumns] = useState([
        { 'id': 0, 'headerName': 'Name', 'columnName': 'categoryName', 'sortUp': false, 'sortDown': false },
        { 'id': userId, 'headerName': 'Description', 'columnName': 'categoryDescription', 'sortUp': false, 'sortDown': false },

    ])
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('expenseDate');
    const [sortOrder, setSortOrder] = useState('desc');

    const { data: category, isLoading, refetch } = useQuery(
        ['category', { sortBy, sortOrder, searchTerm }],
        () => fetchCategory(sortBy, sortOrder,searchTerm), {
        datakey: "catogery"
    })


    // Function to highlight matched words in a string
    function highlightMatchedWords(text, searchTerm) {
        if (!searchTerm || !text) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <span className="bg-green-400" key={index}>{part}</span>;
            } else {
                return part;
            }
        });
    }


    const memoizedCategory = useMemo(() => {
        if (!category) return [];

        const hightlightedExpenseData = category.map(data => {
            return {
                ...data,
                categoryName: highlightMatchedWords(data.categoryName, searchTerm),
                categoryDescription: highlightMatchedWords(data.categoryDescription, searchTerm),

            };
        })
        return hightlightedExpenseData;
    }, [category, searchTerm]);



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
        refetch()
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



    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen(true)

    }
    const closeModal = () => {
        resetForm()
        setIsOpen(false)
    }

    // Form Inputs
    const [openConfirm, setConfirm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')

    const confirmationDialog = (e) => {
        e.preventDefault();
        setConfirm(true)
    }

    const handleSave = async () => {
        try {
            setConfirm(false)
            if (categoryName.trim() === '' || description.trim() === '') {
                return
            }
            const response = await axiosInstance.post("http://localhost:3001/saveCategory", { 'Name': categoryName, 'Description': description, 'userId': userId })
            const { message } = response.data
            toast.success(message)

        } catch (error) {
            console.log("Message : " + error)
            toast.error(error.message)
        }
        setCategoryName('')
        setDescription('')
        refetch();
        closeModal()


    }

    const handleUpdate = async () => {
        try {
            setConfirm(false)
            if (categoryName.trim() === '' || description.trim() === '') {
                return
            }
            const response = await axiosInstance.post("http://localhost:3001/updateCategory", { 'categoryId': id, 'Name': categoryName, 'Description': description, 'userId': userId })
            const { message } = response.data
            toast.success(message)
        } catch (error) {
            console.log("Message : " + error)
            toast.error(error.message)
        }
        setCategoryName('')
        setDescription('')
        refetch();
        closeModal()


    }
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
            const response = await axiosInstance.delete("http://localhost:3001/deleteCategory", {
                params: {
                    "categoryId": idToDelete
                }
            })
            const { message } = response.data
            toast.success(message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
        refetch()
    }

    const resetForm = () => {
        setEditMode(false)
        setCategoryName('')
        setDescription('')

    }

    const handleAddMode = () => {
        openModal()

    }

    const handleEditMode = (data) => {
        setEditMode(true)
        openModal()
        setId(data.categoryId)
        setCategoryName(data['categoryName'])
        setDescription(data['categoryDescription'])
    }



    return (
        <>
            <ToastContainer />

            <Sidebar display={sideBar} active='Category' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>
                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col p-5 sm:p-1 '>

                    <Heading heading='Category' />
                    <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Category' inputStyle='border-2 mt-0.5 p-2 w-full sm:py-1 mt-2 outline-none focus:border-blue-200' />
                    <Button ButtonStyle="px-3 py-2 sm:p-1 my-3 w-40 bg-regalBlue rounded" onClick={handleAddMode} >add Category</Button>
                    <Table data={memoizedCategory} primaryKey='categoryId' isLoading={isLoading} columns={columns} handleSortUp={handleSortUp} handleSortDown={handleSortDown} onEdit={handleEditMode} onDelete={deleteConfirmation} />


                </Flex>
            </Layout>

            {isOpen &&
                <Modal heading={editMode ? "Update Category" : "add Category"} isOpen={isOpen} close={closeModal}>
                    <Flex flexStyle='flex-col px-3 sm:px-0 sm:text-sm'>
                        <Form onSubmit={confirmationDialog}>
                            <Input type='text' labelText="Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} inputStyle=' h-8 sm:h-6 sm:px-0 w-full px-2 border-2  focus:border-regalBlue' />
                            <Input type='text' labelText="Description" value={description} onChange={(e) => setDescription(e.target.value)} inputStyle='h-8 sm:h-6 sm:px-0 w-full px-2 border-2  focus:border-regalBlue' />
                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue rounded sm:py-1 my-3 sm:text-sm'>{editMode ? 'update' : 'add'}</Button>
                        </Form>
                    </Flex>

                </Modal>}
            {openConfirm && <Confirmation handleFunction={editMode ? handleUpdate : handleSave} close={() => setConfirm(false)} message={editMode ? "Do you want to update the category?" : "Do you want to save the category?"} />}

            {deleteConfirm && <Confirmation handleFunction={handleDelete} close={() => setDeleteConfirm(false)} message={"Do you want to delete the category?"} />}

        </>


    )
}


export default Category



