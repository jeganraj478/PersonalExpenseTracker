import React from "react";
import { Link } from 'react-router-dom'

const Sidebar = ({ display, active }) => {
    return (
        <div className={`${display ? 'translate-x-0 md:-translate-x-[300px]' : 'md:translate-x-0  -translate-x-[300px]'} transition-all fixed h-[100%] w-[280px] md:w-[220px] bg-regalBlue text-white sm:text-mobile`}>
            <div className="flex items-center justify-center p-3 " >
                <h1 className="text-white sm:text-sm text-lg font-semibold">Expense Tracker<sup className="px-1 font-bold">1</sup></h1>
            </div>
            <hr className="text-gray-200 " />
            <ul className="flex flex-col gap-6 mt-6 text-md justify-center font-medium items-start overflow-hidden md:w-[210px] w-[270px]">
                <li className={`cursor-pointer  ${active === 'Dashboard' ? 'text-black bg-purple-100 ' : ''} rounded-lg mx-1 px-4 py-2 w-full hover:text-black hover:bg-purple-100  hover:rounded-lg`}><Link to='/expense-dashboard' className="flex justify-between"><span>Dashboard</span> <span><i className="fa fa-dashboard pe-2"></i></span></Link></li>
                <li className={`cursor-pointer ${active === 'Budget' ? 'text-black bg-purple-100  ' : ''} rounded-lg mx-1 px-4 py-2 w-full hover:text-black hover:bg-purple-100  hover:rounded-lg `}><Link to='/budget' className="flex justify-between"><span>Budget</span> <span><i className="fa fa-money pe-2"></i></span></Link></li>
                <li className={`cursor-pointer ${active === 'Expense' ? 'text-black bg-purple-100  ' : ''} rounded-lg mx-1 px-4 py-2 w-full hover:text-black hover:bg-purple-100  hover:rounded-lg`}><Link to='/expense' className="flex justify-between"><span>Expense</span> <span><i className="fa fa-dollar pe-2"></i></span></Link></li>
                <li className={`cursor-pointer ${active === 'Category' ? 'text-black bg-purple-100  ' : ''} rounded-lg mx-1 px-4 py-2 w-full hover:text-black hover:bg-purple-100  hover:rounded-lg`}><Link to='/category' className="flex justify-between"><span>Category</span> <span><i className="fa fa-plus pe-2"></i></span></Link></li>
            </ul>
        </div>
    )
}


export default Sidebar