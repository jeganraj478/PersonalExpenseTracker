import React from 'react';

const Select = ({ data, Style,onChange ,value}) => {

    return (
        <select value={value} onChange={onChange} name="inputSelect" required className={`${Style} px-1 outline-none focus:outline-none focus:border-gray-200`}>
            <option value=''>Select an Option....</option>

            {data.map((option,index) => (
                <option key={index} value={option.budgetName}>{option.budgetName}</option>
            ))}
        </select>
    );
}

export default Select;