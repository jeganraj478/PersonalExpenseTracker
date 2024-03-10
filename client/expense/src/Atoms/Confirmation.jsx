import React from "react";

const Confirmation=({children,close,isOpen})=>{
    return(
        <div
            className={`${isOpen ? 'block' : 'hidden'
                } fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-auto  `}
        >
            <div className="bg-white rounded-lg sm:rounded-none sm:h-screen px-4 ">
                <div className="mb-5">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Confirmation