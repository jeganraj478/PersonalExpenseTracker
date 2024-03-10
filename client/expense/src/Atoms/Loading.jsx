import React from 'react';

const Loading = ({ text }) => {
    return (

        <div className="fixed top-0 right-0 w-80 sm:w-64 z-[150] h-screen flex items-center flex-col justify-center bg-opacity-30 bg-gray-700">
            <div className=' h-8 absolute  w-8 rounded-full border-4 border-l-blue-400 border-t-blue-400 border-b-blue-400 animate-spin'>
            </div>
            <div className='mt-14 text-gray-100'>{text}</div>
        </div>
    );
}

export default Loading








