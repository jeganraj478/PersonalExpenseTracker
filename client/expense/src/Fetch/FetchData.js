import axios from "axios"
import axiosInstance from "./AxiosConfig"
const id=localStorage.getItem("userId")
export const fetchExpenses = async (sortBy, sortOrder,searchTerm) => {
    console.log("API Started")
    try {
        const res = await axiosInstance.post("http://localhost:3001/fetchExpense", { "userId": id}, {
            params: {
                sortBy,
                sortOrder,
                searchTerm
            },
        })
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}
export const fetchAllExpenses = async () => {
    console.log("API Started")
    try {
        const res = await axiosInstance.post("http://localhost:3001/fetchAllExpense", { "userId": id}, {
            
        })
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchCategory = async (sortBy,sortOrder,searchTerm) => {
    console.log("API Started")
    try {
        const res = await axiosInstance.post("http://localhost:3001/fetchAllCategory", { "userId": id}, {
            params: {
                sortBy,
                sortOrder,
                searchTerm
            },
        })
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchBudget = async () => {
    console.log("API Started")
    try {
        const res = await axiosInstance.post("http://localhost:3001/fetchBudget", { "userId": id})
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}







