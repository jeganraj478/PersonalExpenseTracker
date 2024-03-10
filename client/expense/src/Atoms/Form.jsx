import React from 'react';

const Form = ({ onSubmit,children, FormStyle }) => {
    

    return (
        <form onSubmit={onSubmit} className={FormStyle || 'form'}>
            {children}
        </form>
    );
}

export default Form;