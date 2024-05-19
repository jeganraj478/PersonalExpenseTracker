import React from 'react';

const Select = ({ data, Style, onChange, labelStyle, labelText, value }) => {

    return (
        <div className="flex flex-col gap-1.5 my-2">
            <label className={`text-sm text-gray-500  ${labelStyle || ''} `}>
                {labelText}
            </label>
            {data.length > 0 ?
                <select value={value} onChange={onChange} name="inputSelect" className={`${Style} px-1 outline-none rounded focus:outline-none focus:border-regalBlue`} required>
                    <option value=''>Select an Option....</option>

                    {data.map((option, index) => (
                        <option key={index} value={option.budgetName}>{option.budgetName}</option>
                    ))}
                </select> :
                <select name="inputSelect" className={`${Style}  px-1 border-red-400 focus:border-red-400 rounded `} required>
                    <option value=''>Select an Option....</option>
                </select>
            }
        </div>
    );
}

export default Select;