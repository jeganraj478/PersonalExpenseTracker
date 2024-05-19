import React from 'react';


const Button = ({type,onClick,ButtonStyle,children,disabled,id }) => {
    return (
        <button onClick={onClick} type={type} id={id}
            className={`uppercase text-white sm:text-mobile ${ButtonStyle} ${disabled? 'disabled bg-opacity-40 pointer-events-none': 'cursor-pointer'} text-sm`}>
            {children}
        </button>
    );
}

export default Button