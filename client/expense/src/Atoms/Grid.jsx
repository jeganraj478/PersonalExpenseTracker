import React from 'react';

const Grid = ({ children, GridStyle }) => {
    

    return (
        <div className={`${GridStyle }`}>
            {children}
        </div>
    );
}

export default Grid;