import React from 'react';
import TableSpinner from '../Atoms/TableSpinner';

const Table = ({ data, primaryKey, columns, onEdit, onDelete,
    handleSortUp, handleSortDown, isLoading }) => {

    return (
        <div class="flex h-96 border-separate flex-col overflow-clip">
            <table class="w-full table-fixed sm:text-mobileTable">
                <thead class="sticky top-0 bg-white">
                    <tr key="heading_row" className='border-b-2'>
                        {columns.map((column, index) => (
                            <th key={column.headerName} className='px-4 py-2 sm:px-0.5  bg-regalBlue bg-opacity-60   text-left'>{column['headerName']} <span><i onClick={() => handleSortUp(column['columnName'], index)} className={`fa fa-long-arrow-up cursor-pointer ${column['sortUp'] ? 'text-red-600' : 'text-gray-600'}`}></i> <i onClick={() => handleSortDown(column['columnName'], index)} className={`fa fa-long-arrow-down ${column['sortDown'] ? 'text-red-500' : 'text-gray-600'} cursor-pointer`}></i></span></th>
                        ))}
                        <th key='empty_header' className='px-4 py-2 sm:w-9 sm:px-0.5  bg-regalBlue bg-opacity-60 '></th>
                    </tr>
                </thead>
            </table>
            <div class="flex-1 overflow-y-auto">
                <table class="w-full table-fixed sm:text-mobileTable">
                    <tbody>
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

                                                    {(row[column.columnName].toString()).split("T")[0]}
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
                                        <td key={"edit_delete" + row._id} className='px-6 py-2 sm:px-0 sm:w-9 text-left' >
                                            <i className="fa fa-pencil px-3 sm:px-0 cursor-pointer  text-blue-600" onClick={() => onEdit(row)}></i>
                                            <i className="fa fa-trash cursor-pointer sm:px-1.5 text-red-600" onClick={() => onDelete(row[primaryKey])}></i>
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

export default Table;