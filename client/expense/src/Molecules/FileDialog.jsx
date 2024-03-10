import React from 'react';
import Loading from '../Atoms/Loading';

const FileDialog = ({ isOpen, close, children, isLoading,text }) => {
  return (
    <>
      {isLoading && <Loading text={text}></Loading>}
      <div className={`transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} ease-in-out overflow-hidden z-50 w-80 sm:w-64 h-screen bg-white shadow-lg  rounded-sm absolute top-0 right-0`}>
        <div className={`modal`}>
          <div className='flex items-center justify-end h-8 px-3 bg-blue-500'>
            <i className="fa fa-times cursor-pointer" onClick={() => close()}></i>
          </div>
          <div className="modal-content py-5  ">
            {children}
          </div>
        </div>
      </div>
    </>

  );
};

export default FileDialog;



