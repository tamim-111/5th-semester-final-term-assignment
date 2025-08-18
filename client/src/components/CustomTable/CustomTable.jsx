import React, { useState, useEffect } from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import {
    useReactTable, getCoreRowModel, getPaginationRowModel,
    getSortedRowModel, getFilteredRowModel, flexRender,
} from '@tanstack/react-table'

const CustomTable = ({ columns, data, showPriceSort = false }) => {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [priceSort, setPriceSort] = useState('default')

    // Handle price sorting changes
    useEffect(() => {
        if (!showPriceSort) return
        if (priceSort === 'asc') {
            setSorting([{ id: 'price', desc: false }])
        } else if (priceSort === 'desc') {
            setSorting([{ id: 'price', desc: true }])
        } else {
            setSorting([])
        }
    }, [priceSort, showPriceSort])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className='space-y-4'>
            {/* input fields */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
                <input
                    type='text'
                    placeholder='Search medicine, generic, company...'
                    value={globalFilter ?? ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className='input input-bordered w-full sm:max-w-sm'
                />

                {showPriceSort && (
                    <select
                        value={priceSort}
                        onChange={e => setPriceSort(e.target.value)}
                        className='select select-sm w-full sm:w-48'
                    >
                        <option value='default'>Sort by Price</option>
                        <option value='asc'>Price: Low to High</option>
                        <option value='desc'>Price: High to Low</option>
                    </select>
                )}
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className='table w-full  rounded-xl shadow text-sm'>
                    <thead className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className='py-3 px-4 text-left cursor-pointer select-none'
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === 'asc' && <AiOutlineArrowUp className="inline mb-1 ml-1" />}
                                        {header.column.getIsSorted() === 'desc' && <AiOutlineArrowDown className="inline mb-1 ml-1" />}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className='hover:bg-blue-50 hover:text-black transition'>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='py-3 px-4'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                {/* Navigation */}
                <div className='flex flex-wrap gap-2'>
                    <button className='btn btn-sm' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        {'<<'}
                    </button>
                    <button className='btn btn-sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {'<'}
                    </button>
                    <button className='btn btn-sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {'>'}
                    </button>
                    <button className='btn btn-sm' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        {'>>'}
                    </button>
                </div>

                {/* Page Indicator */}
                <span className='text-center sm:text-left'>
                    Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
                </span>

                {/* Page Size Selector */}
                <select
                    className='select select-sm w-full sm:w-auto'
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 50].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default CustomTable
