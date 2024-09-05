import React, { useContext, useEffect } from 'react'
import './AdminDashboard.scss';
import { BooksContext } from '../../context/BooksContext';
import BooksTable from './BooksTable';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const {booksState, booksDispatch} = useContext(BooksContext);
    const navigate = useNavigate();
    
  return (
    <div className='admindashboard-container'>
        <div className="buttons-container">
            <button onClick={() => navigate("/dashboard/addbook")}>Add a book</button>
            <button>Edit account details....</button>
        </div>
        <div className="bookslist-container">
            {booksState.books && <BooksTable books={booksState?.books} booksDispatch={booksDispatch}/>}
        </div>
    </div>
  )
}
