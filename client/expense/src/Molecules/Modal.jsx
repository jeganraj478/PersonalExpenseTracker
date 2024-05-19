import React from "react";

const Modal=({heading,children,close,isOpen})=>{

    return(
        <div
            className={`${isOpen ? 'block' : 'hidden'
                } fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 overflow-auto  `}
        >
            <div className="bg-white rounded-lg sm:rounded-none sm:h-screen py-3 px-4 sm:px-3 w-[40vw] lg:w-[95vw] sm:w-full ">
                <div className='flex justify-between items-center my-2 px-3 sm:px-0'>
                    <h5 className='uppercase text-lg font-semibold'>{heading}</h5>
                    <i className="fa fa-times cursor-pointer text-lg" onClick={()=>close()}></i>
                </div>
                <div className="mb-3">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Modal