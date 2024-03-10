import React from 'react';

const Layout = ({ layoutStyle,children}) => {

    return (
        <div
        className={`${layoutStyle || ''} `}>
            {children}
        
    </div>
    );
}

export default Layout








