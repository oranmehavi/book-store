import React from 'react'
import BooksTable from './BooksTable'
import './BooksTable.scss';


export default function ScrollableTableContainer({books, booksDispatch}) {
  return (
    <div className='table-container'>
        <BooksTable books={books} booksDispatch={booksDispatch} />
    </div>
  )
}
