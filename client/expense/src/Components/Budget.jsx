import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useQuery } from "react-query";


import Sidebar from './Sidebar'
import Topbar from '../Atoms/Topbar'
import Flex from "../Atoms/Flex";
import Heading from '../Atoms/Heading';
import Button from '../Atoms/Button';
import Modal from "../Molecules/Modal";
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
import Layout from "../Atoms/Layout";
import Form from '../Atoms/Form'
import { fetchBudget } from "../Query/Query";




const Budget = () => {
    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }


    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen(true)

    }
    const closeModal = () => {
        resetForm()
        setIsOpen(false)
    }

    
    const { data=[], isLoading, isError } = useQuery('expense', fetchBudget)
    
   

    // Form Inputs
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    const [Name, setName] = useState('')
    const [Amount, setAmount] = useState(0)

    const handleSave = async (e) => {
        try {
            e.preventDefault()
            if (Name.trim() === '' || Amount === 0) {
                return
            }
            await axios.post("http://localhost:3001/saveBudget", { 'Name': Name, 'Amount': Amount, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error)
        }
        setName('');
        setAmount(0);
        closeModal();


    }
    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            if (Name.trim() === '' || Amount === 0) {
                return
            }
            await axios.post("http://localhost:3001/saveBudget", { 'Name': Name, 'Amount': Amount, 'userId': 1 }).then((response) => {
                console.log(response.data)
            })

        } catch (error) {
            console.log("Message : " + error)
        }
        setName('');
        setAmount(0);
        closeModal();


    }


    const handleDelete = (id) => {
        console.log(id)
    }

    const resetForm = () => {
        setEditMode(false)
        setName('');
        setAmount(0);

    }

    

    const handleEditMode = (data) => {
        setEditMode(true)
        openModal()
        setId(data.budgetId)
        setName(data.budgetName);
        setAmount(data.Amount);
    }

    return (
        <>
            <Sidebar display={sideBar} active='Budget' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>


                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col p-5 sm:p-1'>

                    <Heading heading='Budget' />
                    <Flex flexStyle='flex-row gap-4 pt-5 pb-7'>
                        <Layout layoutStyle='h-24 w-24 bg-blue-200 rounded-sm grid place-items-center'>
                            <Button onClick={openModal}><i className="fa fa-plus text-white text-3xl"></i></Button>
                            </Layout>
                        {data.length>0 ? 
                            data.map((item,index)=>(
                                <>
                                <Layout layoutStyle='h-24 cursor-pointer min-w-24 bg-blue-500 rounded-sm grid place-items-center px-2'>
                            <p className="font-bold text-white text-wrap">{item.budgetName}</p>
                            <p className="text-sm flex gap-2 ">
                                <i onClick={()=>handleEditMode(item)} className=" grid h-6  w-6 bg-white place-items-center rounded-full fa fa-pencil text-blue-600 "></i>
                                <i onClick={()=>handleDelete(item["budgetId"])} className=" grid h-6 w-6 place-items-center bg-white rounded-full fa fa-trash text-red-600"></i>
                            </p>
                        </Layout>
                                </>
                            ))
                         : 
                        <>
                        </>}

                    </Flex>



                </Flex>
            </Layout>

            {isOpen &&
                <Modal heading={editMode ? 'update Budget' : 'add Budget'} isOpen={isOpen} close={closeModal}>
                    <Flex flexStyle='flex-col px-3 sm:px-0 sm:text-sm'>
                        <Form onSubmit={editMode ? handleUpdate : handleSave}>
                            <Flex flexStyle='flex-col py-2 sm:py-1'>
                                <Label labelText="Budget Name" />
                                <Input type='text'value={Name}  onChange={(e) => setName(e.target.value)} disabled ={editMode ? true:false} inputStyle=' h-8 sm:h-6 sm:px-0 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Flex flexStyle='flex-col py-2 sm:py-1 '>
                                <Label labelText="Budget Amount" />
                                <Input type='text' value={Amount} onChange={(e) => setAmount(e.target.value)} inputStyle='h-8 sm:h-6 sm:px-0 w-full px-2 border-2 rounded-sm focus:border-regalBlue' />
                            </Flex>
                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue rounded sm:py-1 my-3 sm:text-sm'>{editMode ? 'update' : 'add'}</Button>
                        </Form>
                    </Flex>
                </Modal>}
        </>


    );
}

export default Budget