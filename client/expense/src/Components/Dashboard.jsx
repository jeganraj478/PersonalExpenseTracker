import React, { useState } from "react"


import Chart from "../Molecules/Chart"
import Sidebar from './Sidebar'
import Topbar from '../Atoms/Topbar'
import Layout from "../Atoms/Layout"
import Grid from '../Atoms/Grid'
import Flex from '../Atoms/Flex'
import Card from '../Molecules/Card'




const Dashboard = () => {

    const [sideBar, setSideBar] = useState(true)
    const handleSideBar = () => {
        setSideBar(!sideBar)
    }
    const barChartData = {
        type: 'bar',
        labels: ['Label 1', 'Label 2', 'Label 3'],
        data: [12, 19, 3],
        chartLabel: 'Bar Chart',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
    }
    const lineChartData = {
        type: 'line',
        labels: ['Label 1', 'Label 2', 'Label 3'],
        data: [12, 19, 3],
        chartLabel: 'Line Chart',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
    }


    return (
        <>

            <Sidebar display={sideBar} active='Dashboard' />
            <Layout layoutStyle={`relative ${sideBar ? 'left-[280px] w-[calc(100%-280px)] md:left-0 md:w-[100%] ]' : 'left-0 w-[100%] md:left-[220px] md:w-[calc(100%-220px)'} transition-all overflow-x-hidden `}>

                <Topbar onClick={handleSideBar} />
                {/* <Flex flexStyle='flex gap-10 p-2 sm:flex-col sm:flex-reverse'>
                    <Grid GridStyle='grid gap-10 grid-cols-2 sm:grid-cols-1  '>
                        <Layout layoutStyle='w-80 h-80 border-2 sm:h-60 sm:w-60 shadow-lg p-2 rounded'>
                            <Chart {...lineChartData}></Chart>
                        </Layout>
                        <Layout layoutStyle='w-80  h-80 border-2 sm:h-60 sm:w-60 shadow-lg p-2 rounded '>
                            <Chart {...barChartData}></Chart>
                        </Layout>

                    </Grid>
                    <Flex flexStyle='flex-col gap-10'>
                       <Card>Card</Card>
                    </Flex>
    </Flex> */}
                <Flex flexStyle='justify-between gap-4 m-4 flex-wrap items-center'>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>


                </Flex>
                <Flex flexStyle=' gap-4 m-4 flex-wrap items-center'>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 rounded'>
                        <Chart {...lineChartData}></Chart>
                    </Layout>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 rounded '>
                        <Chart {...barChartData}></Chart>
                    </Layout>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 rounded'>
                        <Chart {...lineChartData}></Chart>
                    </Layout>
                    <Layout layoutStyle='w-full h-96 border-2 sm:h-60 sm:w-full shadow-lg p-2 rounded '>
                        <Chart {...barChartData}></Chart>
                    </Layout>
                </Flex>

            </Layout>

        </>


    )
}


export default Dashboard






