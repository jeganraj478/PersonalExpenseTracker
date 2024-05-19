import React from 'react';

const SearchBar = ({ type, onChange, placeholder, inputStyle }) => {
    return (
        <>
            <input id='exp_seearch_bar'
                type={type} onChange={onChange} placeholder={placeholder}
                className={`${inputStyle} sm:text-mobile rounded outline-none focus:border-regalBlue`} required
            />
        </>
    );
}

export default SearchBar








