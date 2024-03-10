import axios from "axios"

export const fetchExpenses = async (sortBy, sortOrder,searchTerm) => {
    console.log("API Started")
    try {
        const res = await axios.post("http://localhost:3001/fetchAllExpense", { "userId": 1 }, {
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

export const fetchCategory = async (sortBy,sortOrder) => {
    console.log("API Started")
    try {
        const res = await axios.post("http://localhost:3001/fetchAllCategory", { "userId": 1 }, {
            params: {
                sortBy,
                sortOrder
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
        const res = await axios.post("http://localhost:3001/fetchBudget", { "userId": 1 })
        return res.data
    } catch (error) {
        console.log(error.message)
    }
}







