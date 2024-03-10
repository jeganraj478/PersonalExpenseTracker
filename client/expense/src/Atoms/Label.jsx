import React from 'react';

const Label = ({ labelText, labelStyle}) => {

    return (
        <label
        className={`text-sm text-gray-500 py-1.5 ${labelStyle || ''} `}>
        {labelText}
    </label>
    );
}

export default Label








