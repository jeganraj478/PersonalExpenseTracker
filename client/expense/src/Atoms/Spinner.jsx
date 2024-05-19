import React from 'react';

const Spinner = () => {
    return (

        <div className=" flex items-center flex-col justify-center  z-[150] h-screen bg-white">
            <div className=' h-8  w-8 rounded-full border-8 border-l-blue-400 border-t-blue-400 border-b-blue-400 animate-spin'>
            </div>
       
        </div>
    );
}

export default Spinner;








