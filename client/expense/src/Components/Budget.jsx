import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../Fetch/AxiosConfig";


import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import Topbar from '../Atoms/Topbar';
import Flex from "../Atoms/Flex";
import Heading from '../Atoms/Heading';
import Button from '../Atoms/Button';
import Modal from "../Molecules/Modal";
import Input from '../Atoms/Input';
import Layout from "../Atoms/Layout";
import Form from '../Atoms/Form';
import Confirmation from '../Atoms/Confirmation'


import { fetchBudget } from "../Fetch/FetchData";

const Budget = () => {
    const userId = localStorage.getItem("userId")
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

    const { data: budgetData, isLoading: budgetLoading, error: budgetError, refetch } = useQuery(
        "budget",
        () => fetchBudget(),
        {
            dataKey: "budget",
        }
    );
    const memoizedBudgetData = useMemo(() => budgetData, [budgetData]);

    // Form Inputs
    const [openConfirm, setConfirm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    const [Name, setName] = useState('')
    const [Amount, setAmount] = useState(0)

    const confirmationDialog = (e) => {
        e.preventDefault();
        setConfirm(true)
    }

    const handleSave = async () => {
        try {
            if (Name.trim() === '' || Amount === 0) {
                return
            }
            setConfirm(false)

            const response = await axiosInstance.post("http://localhost:3001/saveBudget", { 'Name': Name, 'Amount': Amount, 'userId': userId })
            const {message}=response.data
            toast.success(message)
        } catch (error) {
            console.log("Message : " + error)
            toast.error(error.message)
        }
        setName('');
        setAmount(0);
        closeModal();
        refetch()


    }
    const handleUpdate = async () => {
        try {
            if (Name.trim() === '' || Amount === 0) {
                return
            }
            setConfirm(false)
            const response = await axiosInstance.post("http://localhost:3001/updateBudget", { 'budgetId': id, 'Name': Name, 'Amount': Amount, 'userId': userId })
            const {message}=response.data
            toast.success(message)

        } catch (error) {
            console.log("Message : " + error)
            toast.error(error.message)
        }
        setName('');
        setAmount(0);
        closeModal();
        refetch()


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
            const response = await axiosInstance.delete("http://localhost:3001/deleteBudget", {
                params: {
                    "budgetId": idToDelete
                }
            })
            const {message}=response.data
            toast.success(message)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
        
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
            <ToastContainer />
            <Sidebar display={sideBar} active='Budget' />

            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>


                <Topbar onClick={handleSideBar} />

                <Flex flexStyle='flex-col p-5 sm:p-1'>

                    <Heading heading='Budget' />
                    <Flex flexStyle='flex-row gap-4 pt-5 pb-7 flex-wrap'>
                        <Layout onClick={openModal} layoutStyle='h-28 w-60 bg-blue-200 rounded-sm grid place-items-center'>
                            <Button><i className="fa fa-plus text-white text-3xl"></i></Button>
                        </Layout>
                        {memoizedBudgetData ? memoizedBudgetData.length > 0 ?
                            memoizedBudgetData.map((item, index) => (
                                <>
                                    <Layout layoutStyle='h-28 cursor-pointer w-60 max-w-50 bg-blue-500 rounded-sm grid place-items-center px-2'>
                                        <p className="font-bold text-white text-wrap">{item.budgetName}</p>
                                        <p className="text-sm flex gap-5 ">
                                            <i onClick={() => handleEditMode(item)} className=" grid h-6  w-6 bg-white place-items-center rounded-full fa fa-pencil text-blue-600 "></i>
                                            <i onClick={() => deleteConfirmation(item["budgetId"])} className=" grid h-6 w-6 place-items-center bg-white rounded-full fa fa-trash text-red-600"></i>
                                        </p>
                                    </Layout>
                                </>
                            ))
                            :
                            <>
                            </> : <></>}

                    </Flex>

                </Flex>
            </Layout>

            {isOpen &&
                <Modal heading={editMode ? 'update Budget' : 'add Budget'} isOpen={isOpen} close={closeModal}>
                    <Flex flexStyle='flex-col px-3 sm:px-0 sm:text-sm'>
                        <Form onSubmit={confirmationDialog}>
                            <Input id='budget_name' labelText="Budget Name" type='text' value={Name} onChange={(e) => setName(e.target.value)} disabled={editMode ? true : false} inputStyle=' h-8 sm:h-6 sm:px-0 w-full px-2 border-2  ' />
                            <Input id='budget_amount' labelText="Budget Amount" type='text' value={Amount} onChange={(e) => setAmount(e.target.value)} inputStyle='h-8 sm:h-6 sm:px-0 w-full px-2 border-2  ' />
                            <Button type='submit' ButtonStyle='px-3 py-2 bg-regalBlue rounded sm:py-1 my-3 sm:text-sm'>{editMode ? 'update' : 'add'}</Button>
                        </Form>
                    </Flex>
                </Modal>}



            {openConfirm && <Confirmation handleFunction={editMode ? handleUpdate : handleSave} close={() => setConfirm(false)} message={editMode ? "Do you want to update the budget?" : "Do you want to save the budget?"} />}

            {deleteConfirm && <Confirmation handleFunction={handleDelete} close={() => setDeleteConfirm(false)} message={"Do you want to delete the budget?"} />}

        </>


    );
}

export default Budget