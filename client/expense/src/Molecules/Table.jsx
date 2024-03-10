import React from 'react';


const Table = ({ data,primaryKey,columns, onEdit, onDelete, handleSortUp, handleSortDown, isLoading }) => {
    return (
        <table className='table sm:table-fixed sm:text-mobileTable '>
            <thead>
                <tr key="heading_row" className='border-b-2'>
                    {columns.map((column, index) => (

                        <th key={column.headerName} className='px-4 py-2 sm:px-0.5  bg-regalBlue bg-opacity-60   text-left'>{column['headerName']} <span><i onClick={() => handleSortUp(column['columnName'], index)} className={`fa fa-long-arrow-up cursor-pointer ${column['sortUp'] ? 'text-red-600' : 'text-gray-600'}`}></i> <i onClick={() => handleSortDown(column['columnName'], index)} className={`fa fa-long-arrow-down ${column['sortDown'] ? 'text-red-500' : 'text-gray-600'} cursor-pointer`}></i></span></th>


                    ))}
                    <th key='empty_header' className='px-4 py-2  sm:px-0.5  bg-regalBlue bg-opacity-60 '></th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading ?
                        ["skeleton_1", "skeleton_1", "skeleton_1", "skeleton_1"].map((_, number) => {
                            <tr>
                                {["skeleton_1", "skeleton_1", "skeleton_1", "skeleton_1"].map((_, index) => (

                                    <td key={"skeleton" + index} className='px-4 py-2 sm:px-0.5  bg-regalBlue bg-opacity-60 text-left'> <span className='h-4 w-10 animate-pulse bg-gray-500'>Text</span>Text</td>
                                ))}
                            </tr>
                        })

                        :
                        (data.length > 0 ?
                            data.map((row) => (
                                <tr key={row[primaryKey]} className='border-b-2'>
                                    {columns.map((column) => (

                                        (column.dateColumn) ?
                                            <>
                                                <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                    {(row[column.columnName].toString()).split("T")[0]}

                                                </td>
                                            </>
                                            : (column.moneyColumn) ?
                                                <>
                                                    <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                        <i className="fa fa-inr text-black"></i> {row[column.columnName]}
                                                    </td>
                                                </> :
                                                <>
                                                    <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                        {row[column.columnName]}
                                                    </td>
                                                </>
                                    ))}
                                    <td key={"edit_delete" + row._id} className='px-6 py-2  sm:px-0 text-left' >
                                        <i className="fa fa-pencil px-3 sm:px-1.5 cursor-pointer  text-blue-600" onClick={() => onEdit(row)}></i>
                                        <i className="fa fa-trash cursor-pointer  text-red-600" onClick={() => onDelete(row[primaryKey])}></i>
                                    </td>

                                </tr>
                            ))
                            :
                            <>
                                <tr key="noResultRow" className='h-32'>
                                    <td colSpan={columns.length} className='text-center '>No Result</td>
                                </tr>
                            </>
                        )}
            </tbody>
        </table >
    );
}

export default Table;