import React from 'react';

const Card = ({ cardStyle,children}) => {

    return (
        <div
        className={` w-64 sm:w-full h-28 shadow-lg border-l-8 rounded border-y-2 border-y-gray-300 border-r-2 border-r-gray-300   ${cardStyle || ''}`}>
            {children}
        
    </div>
    );
}

export default Card








