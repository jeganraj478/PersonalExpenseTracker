

import React from 'react';
import TableSpinner from '../Atoms/TableSpinner';
import Layout from '../Atoms/Layout';

const TableExample = ({ data, primaryKey, columns, onEdit, onDelete, handleSortUp, handleSortDown, isLoading }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="overflow-x-auto">
                <table className='table w-full  sm:table-fixed sm:text-mobileTable '>
                    <thead className='position-fixed top-0 overflow-y-hidden'>
                        <tr key="heading_row" className='border-b-2'>
                            {columns.map((column, index) => (
                                <th key={column.headerName} className='px-4 py-2 sm:px-0.5  bg-regalBlue bg-opacity-60   text-left'>{column['headerName']} <span><i onClick={() => handleSortUp(column['columnName'], index)} className={`fa fa-long-arrow-up cursor-pointer ${column['sortUp'] ? 'text-red-600' : 'text-gray-600'}`}></i> <i onClick={() => handleSortDown(column['columnName'], index)} className={`fa fa-long-arrow-down ${column['sortDown'] ? 'text-red-500' : 'text-gray-600'} cursor-pointer`}></i></span></th>
                            ))}
                            <th key='empty_header' className='px-4 py-2 sm:w-10 sm:px-0.5  bg-regalBlue bg-opacity-60 '></th>
                        </tr>
                    </thead>

                    <tbody className='max-h-10 overflow-y-scroll'>
                        {isLoading ?
                            <tr key="spinnerRow">
                                <td colSpan={columns.length} className="py-20">
                                    <TableSpinner />
                                </td>
                            </tr>
                            :
                            (data.length > 0 ?
                                data.map((row) => (
                                    <tr key={row[primaryKey]} className='border-b-2'>
                                        {columns.map((column) => (
                                            (column.dateColumn) ?
                                                <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                    
                                                    <Layout >{(row[column.columnName].toString()).split("T")[0]}</Layout>
                                                </td>
                                                : (column.moneyColumn) ?
                                                    <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                        <i className="fa fa-inr text-black"></i> {row[column.columnName]}
                                                    </td>
                                                    :
                                                    <td key={column.columnName} className='px-4 py-2 sm:px-0.5 text-left'>
                                                        {row[column.columnName]}
                                                    </td>
                                        ))}
                                        <td key={"edit_delete" + row._id} className='px-6 py-2 sm:px-0 text-left' >
                                            <i className="fa fa-pencil px-3 sm:px-1.5 cursor-pointer  text-blue-600" onClick={() => onEdit(row)}></i>
                                            <i className="fa fa-trash cursor-pointer  text-red-600" onClick={() => onDelete(row[primaryKey])}></i>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr key="noResultRow" className='h-32'>
                                    <td colSpan={columns.length} className='text-center '>No Result</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableExample;
