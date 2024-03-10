import React from 'react';

const Flex = ({ children, flexStyle }) => {
    

    return (
        <div className={`flex ${flexStyle }`}>
            {children}
        </div>
    );
}

export default Flex;