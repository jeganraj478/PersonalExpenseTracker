import React from "react";

const TopBar = ({onClick}) => {
    return (
      
      <div className="shadow-lg w-full p-3.5 sm:text-mobile sm:px-1.5">
        <div className=" flex justify-between gap-20 items-center">
          <div className="cursor-pointer" onClick={onClick}>
          <p className="w-6 sm:w-4 sm:mt-0.5 mt-1 bg-black h-0.5" ></p>
          <p className="w-6 sm:w-4 sm:mt-0.5 mt-1 bg-black h-0.5" ></p>
            <p className="w-6 mt-1 h-0.5 sm:w-4 sm:mt-0.5  bg-black " ></p>
          </div>
            
            <p className="border-l-2 font-semibold relative px-2 before:content-'JEGANRAJ' before:absolute border-blue-700 uppercase text-black ">jeganraj</p>
        </div>
    

      </div>
    
    )
}



export default TopBar