import React from 'react';

const Input = ({ onChange, type, placeholder, inputStyle ,value,disabled}) => {

    return (
        <>
            <input value={value}
                type={type} onChange={onChange} placeholder={placeholder}
                className={`${inputStyle} sm:text-mobile ${disabled ? 'disabled bg-gray-200 pointer-events-none':''} outline-none`} required
            />
        </>
    );
}

export default Input








