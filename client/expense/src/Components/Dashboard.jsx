import React, { useState, useMemo } from "react"
import { useQuery } from "react-query"
import { fetchAllExpenses } from "../Fetch/FetchData"

import Chart from "../Molecules/Chart"
import Sidebar from '../Components/Sidebar'
import Topbar from '../Atoms/Topbar'
import Layout from "../Atoms/Layout"
import Flex from '../Atoms/Flex'
import Card from '../Molecules/Card'

const Dashboard = () => {
   
   
    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }

    // Fetch Data
    const { data: expenseData, isLoading, error } = useQuery(
        "expenseDashboard",
        () => fetchAllExpenses(),
        {
            dataKey: "expenseDashboard",
        }
    );

    const currentYearExpenses = useMemo(() => {
        if (!expenseData) return [];

        const currentDate = new Date();
        const currentYear = currentDate.getYear();

        const filterExpenses = expenseData.filter(expense => {
            const expenseDate = new Date(expense.expenseDate);
            return expenseDate.getYear() === currentYear;
        });

        const expenseMap = new Map();
        filterExpenses.forEach(expense => {
            const { expenseCategory, expenseAmount } = expense;

            if (expenseMap.has(expenseCategory)) {
                const currentAmount = expenseMap.get(expenseCategory);
                expenseMap.set(expenseCategory, currentAmount + expenseAmount);
            } else {

                expenseMap.set(expenseCategory, expenseAmount);
            }
        });


        const yearExpenses = Array.from(expenseMap).map(([expenseCategory, expenseAmount]) => ({
            expenseCategory,
            expenseAmount
        }));



        return yearExpenses;
    }, [expenseData]);

    console.log(currentYearExpenses)


    const currentMonthExpenses = useMemo(() => {
        if (!expenseData) return [];

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        const filterExpenses = expenseData.filter(expense => {
            const expenseDate = new Date(expense.expenseDate);
            return expenseDate.getMonth() + 1 === currentMonth;
        });

        const expenseMap = new Map();
        filterExpenses.forEach(expense => {
            const { expenseCategory, expenseAmount } = expense;
            if (expenseMap.has(expenseCategory)) {
                const currentAmount = expenseMap.get(expenseCategory);
                expenseMap.set(expenseCategory, currentAmount + expenseAmount);
            } else {
                expenseMap.set(expenseCategory, expenseAmount);
            }
        });
        const monthExpenses = Array.from(expenseMap).map(([expenseCategory, expenseAmount]) => ({
            expenseCategory,
            expenseAmount
        }));
        console.log(monthExpenses)

        return monthExpenses;
    }, [expenseData]);



    const calculateAmount = (expenses) => {
        if (!expenses)
            return 0;

        const amount = expenses.reduce((total, expense) => total + expense.expenseAmount, 0)
        return amount;
    }
    const categoryList = (expenses) => {
        if (!expenses) return []

        return expenses.map((expense) => {
            return expense.expenseCategory
        })
    }

    const amountList = (expenses) => {
        if (!expenses) return []

        return expenses.map((expense) => {
            return expense.expenseAmount
        })

    }


    const MonthAmount = useMemo(() => calculateAmount(currentMonthExpenses), [currentMonthExpenses]);


    const currentMonthCategoryList = useMemo(() => categoryList(currentMonthExpenses), [currentMonthExpenses])


    const currentMonthAmountList = useMemo(() => amountList(currentMonthExpenses), [currentMonthExpenses])


    const YearAmount = useMemo(() => calculateAmount(currentYearExpenses), [currentYearExpenses]);


    const currentYearCategoryList = useMemo(() => categoryList(currentYearExpenses), [currentYearExpenses])


    const currentYearAmountList = useMemo(() => amountList(currentYearExpenses), [currentYearExpenses])




    const lifeTimeAmount = useMemo(() => calculateAmount(currentYearExpenses), [currentYearExpenses]);
    console.log(lifeTimeAmount)

    const lifeTimeCategoryList = useMemo(() => categoryList(currentYearExpenses), [currentYearExpenses])
    console.log(lifeTimeCategoryList)

    const lifeTimeAmountList = useMemo(() => amountList(currentYearExpenses), [currentYearExpenses])
    console.log(lifeTimeAmountList)


    // Define chart data

    const MonthGraph = useMemo(() => ({
        type: 'line',
        labels: currentMonthCategoryList,
        data: currentMonthAmountList,
        chartLabel: 'Monthly Expense',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
    }), [currentMonthAmountList, currentMonthCategoryList]);



    const YearGraph = useMemo(() => ({
        type: 'bar',
        labels: currentYearCategoryList,
        data: currentYearAmountList,
        chartLabel: 'Yearly Expense',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
    }), [currentYearAmountList, currentYearCategoryList])

    const Graph = useMemo(() => ({
        type: 'line',
        labels: lifeTimeCategoryList,
        data: lifeTimeAmountList,
        chartLabel: 'Expense',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
    }), [currentYearAmountList, currentYearCategoryList])

    return (
        <>
            <Sidebar display={sideBar} active='Dashboard' />
            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>
                <Topbar onClick={handleSideBar} />
                <Flex flexStyle='justify-between  gap-4  m-4 sm:mx-2 flex-wrap items-center'>
                    <Card cardStyle='border-l-blue-400 p-4 '>
                        <h2 className="uppercase font-bold text-blue-400 py-2">
                            This month Expense
                        </h2>
                        <p className="text-lg">
                            {MonthAmount}
                        </p>
                    </Card>
                    <Card cardStyle='border-l-green-400 p-4'>
                        <h2 className="uppercase font-bold text-green-400 py-2">
                            Year Expense
                        </h2>
                        <p className="text-lg">
                            {YearAmount}
                        </p>
                    </Card>
                    <Card cardStyle='border-l-red-400 p-4'>
                        <h2 className="uppercase font-bold text-red-400 py-2">
                            Total Expenses
                        </h2>
                        <p className="text-lg">
                            {lifeTimeAmount}
                        </p>
                    </Card>

                </Flex>
                <Flex flexStyle=' gap-4 m-4 sm:mx-2 flex-wrap items-center'>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2  sm:px-0.5 rounded'>

                        {currentMonthExpenses.length > 0 ?
                            <>
                                <Chart {...MonthGraph}></Chart>
                            </>
                            :
                            <>
                                No Data Found
                            </>
                            }

                    </Layout>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 sm:px-0.5 rounded '>
                        <Chart {...YearGraph}></Chart>
                    </Layout>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 sm:px-0.5 rounded'>
                        <Chart {...Graph}></Chart>
                    </Layout>

                </Flex>
            </Layout>
        </>
    )
}

export default Dashboard
