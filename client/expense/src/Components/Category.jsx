import React, { useCallback, useState } from "react"
import axios from 'axios'
import { useQuery } from "react-query"

import Sidebar from './Sidebar'
import Topbar from '../Atoms/Topbar'
import Flex from "../Atoms/Flex"
import Heading from '../Atoms/Heading'
import Button from '../Atoms/Button'
import Modal from "../Molecules/Modal"
import Input from '../Atoms/Input'
import Label from '../Atoms/Label'
import Form from '../Atoms/Form'
import Table from '../Molecules/Table'
import Layout from "../Atoms/Layout"

import { fetchCategory } from "../Query/Query"




const Category = () => {

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
        { 'id': 1, 'headerName': 'Description', 'columnName': 'categoryDescription', 'sortUp': false, 'sortDown': false },

    ])
    const [sortBy, setSortBy] = useState('expenseDate');
    const [sortOrder, setSortOrder] = useState('desc');

    const { data: category, isLoading, refetch } = useQuery(
        ['category', { sortBy, sortOrder }],
        () => fetchCategory(sortBy, sortOrder), {
        datakey: "catogery"
    })

    const handleSortUp =useCallback((sortColumn, index) => {
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
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')

    const handleSave = async (e) => {
        try {
            e.preventDefault()
            if (categoryName.trim() === '' || description.trim() === '') {
                return
            }
            await axios.post("http://localhost:3001/saveCategory", { 'Name': categoryName, 'Description': description, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error)
        }
        setCategoryName('')
        setDescription('')
        refetch();
        closeModal()


    }

    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            if (categoryName.trim() === '' || description.trim() === '') {
                return
            }
            await axios.post("http://localhost:3001/saveCategory", { 'Name': categoryName, 'Description': description, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error)
        }
        setCategoryName('')
        setDescription('')
        refetch();
        closeModal()


    }
    const handleDelete = (id) => {
        console.log(id)
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
        console.log(data)
        setEditMode(true)
        openModal()
        setId(data.categoryId)
        setCategoryName(data['categoryName'])
        setDescription(data['categoryDescription'])
    }



    return (
        <>

            <Sidebar display={sideBar} active='Category' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>
                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col p-5 sm:p-1 '>

                    <Heading heading='Category' />
                    <Button ButtonStyle="px-3 py-2 sm:p-1 my-3 w-40 bg-regalBlue rounded" onClick={handleAddMode} >add Category</Button>
                    <Table data={category || []} primaryKey='categoryId' columns={columns} handleSortUp={handleSortUp} handleSortDown={handleSortDown} onEdit={handleEditMode} onDelete={handleDelete} />


                </Flex>
            </Layout>

            {isOpen &&
                <Modal heading={editMode ? "Update Category" : "add Category"} isOpen={isOpen} close={closeModal}>
                    <Flex flexStyle='flex-col px-3 sm:px-0 sm:text-sm'>
                        <Form onSubmit={editMode ? handleUpdate : handleSave}>
                            <Flex flexStyle='flex-col py-2 sm:py-1'>
                                <Label labelText="Name" />
                                <Input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} inputStyle=' h-8 sm:h-6 sm:px-0 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Flex flexStyle='flex-col py-2 sm:py-1 '>
                                <Label labelText="Description" />
                                <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} inputStyle='h-8 sm:h-6 sm:px-0 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>

                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue rounded sm:py-1 my-3 sm:text-sm'>{editMode ? 'update' : 'add'}</Button>
                        </Form>
                    </Flex>

                </Modal>}
        </>


    )
}


export default Category