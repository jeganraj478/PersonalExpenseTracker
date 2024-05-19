import React from 'react';

const FileUpload = ({ handleFileChange }) => {
    return (
        <div>
            <label className='bg-regalBlue text-white px-2 py-1 rounded' htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                Upload
            </label>
            <input 
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

        </div>
    );
};

export default FileUpload;
