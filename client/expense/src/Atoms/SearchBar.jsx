import React from 'react';

const SearchBar = ({ onChange,placeholder}) => {
    return (
        <>
        <input type='text' onChange={()=>onChange()} placeholder={placeholder} className='border-2 px-2 rounded-sm w-[40%] sm:w-56 outline-none focus:border-blue-200'/>
        </>
    );
}

export default SearchBar








