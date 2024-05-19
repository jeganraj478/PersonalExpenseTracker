import React from "react";

const Confirmation=({message,close,handleFunction})=>{
    return(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15 overflow-auto  `}
        >
            <div className="bg-white rounded p-5 sm:px-2">
                <div className="mb-4">
                    {message} 
                </div>
                <div className="flex justify-end gap-4">
                    <button className="rounded-sm border-[1px] border-black text-sm  px-1 py-0.5" onClick={close}>Cancel</button>
                    <button className="rounded-sm border-[1px] border-black text-sm  text-white bg-blue-500 px-1 py-0.5" onClick={handleFunction}>Ok</button>
                </div>

            </div>
        </div>
    )
}

export default Confirmation