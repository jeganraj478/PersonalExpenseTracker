import React from 'react';

const Layout = ({ layoutStyle,children,onClick}) => {

    return (
        <div onClick={onClick}
        className={`${layoutStyle || ''} `}>
            {children}
        
    </div>
    );
}

export default Layout








