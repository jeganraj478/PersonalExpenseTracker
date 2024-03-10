import React from "react";
import {Link} from 'react-router-dom'

const Sidebar = ({ display, active }) => {
    return (
        <div className={`${display ? 'translate-x-0 md:-translate-x-[300px]' : 'md:translate-x-0  -translate-x-[300px]'} transition-all fixed h-[100%] w-[280px] sm:w-[220px] bg-regalBlue text-white sm:text-mobile`}>
            <div className="flex items-center justify-center p-3 " >
                <h1 className="text-white sm:text-sm text-lg font-semibold">Expense Tracker<sup className="px-1 font-bold">1</sup></h1>
            </div>
            <hr className="text-gray-200 " />
            <ul className="flex flex-col gap-6 mt-6 text-md justify-center font-medium items-start ">
                <li className={`cursor-pointer  ${active === 'Dashboard' ? 'text-black bg-teal-100  rounded-sm`' : ''} px-10 py-2 w-full hover:text-black hover:bg-teal-100  hover:rounded-sm`}><Link to='/'>Dashboard</Link></li>
                <li className={`cursor-pointer ${active === 'Budget' ? 'text-black bg-teal-100  rounded-sm`' : ''} px-10 py-2 w-full hover:text-black hover:bg-teal-100  hover:rounded-sm `}><Link to='/budget'>Budget</Link></li>
                <li className={`cursor-pointer ${active === 'Expense' ? 'text-black bg-teal-100  rounded-sm`' : ''} px-10 py-2 w-full hover:text-black hover:bg-teal-100  hover:rounded-sm`}><Link to='/expense'>Expense</Link></li>
                <li className={`cursor-pointer ${active === 'Category' ? 'text-black bg-teal-100  hrounded-sm`' : ''} px-10 py-2 w-full hover:text-black hover:bg-teal-100  hover:rounded-sm`}><Link to='/category'>Category</Link></li>
            </ul>
        </div>
    )
}


export default Sidebar