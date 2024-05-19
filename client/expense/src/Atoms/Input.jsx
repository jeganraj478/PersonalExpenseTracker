import React from 'react';

const Input = ({ onChange, type, placeholder, inputStyle, labelStyle, labelText, value, disabled, id }) => {

    return (
        <div className='flex flex-col gap-2 py-2 '>
            <label
                className={`text-sm text-gray-500  ${labelStyle || ''} `}>
                {labelText}
            </label>
            <input value={value} id={id}
                type={type} onChange={onChange} placeholder={placeholder}
                className={`${inputStyle} sm:text-mobile rounded ${disabled ? 'disabled bg-gray-200 pointer-events-none' : ''} outline-none focus:border-regalBlue`} required
            />
        </div>
    );
}

export default Input








