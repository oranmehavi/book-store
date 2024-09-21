import React from 'react'
import BooksTable from './BooksTable'
import './BooksTable.scss';


export default function ScrollableTableContainer({books, booksDispatch, updateBooks}) {
  return (
    <div className='table-container'>
        <BooksTable books={books} booksDispatch={booksDispatch} updateBooks={updateBooks}/>
    </div>
  )
}
