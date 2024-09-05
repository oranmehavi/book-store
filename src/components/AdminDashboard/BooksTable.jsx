import React from 'react'
import {useNavigate} from 'react-router-dom';
import './BooksTable.scss';
import { deleteFromLocalStorage } from '../../Utils/LocalStorage';
import { removeBookAction } from '../../actions/booksAction';

export default function BooksTable({books, booksDispatch}) {
  const navigate = useNavigate();
  
  const navigateToBookEdit = (index) => {
    navigate(`/dashboard/editbook/${index}`);
  };

  const deleteBook = (index) => {
    const res = confirm("Are you sure you want to delete the book");
    if (res) {
      deleteFromLocalStorage(index);
      booksDispatch(removeBookAction(index));
    }
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Book id</th>
          <th>Book name</th>
          <th>Author</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.bookName}</td>
            <td>{book.author}</td>
            <td>{book.price.toLocaleString("he-IL", {
                  style: "currency",
                  currency: "ILS",
                })}</td>
            <td>{book.discount}%</td>
            <td className='actions'>
                <button onClick={() => navigateToBookEdit(index)}>Edit book</button>
                <button onClick={() => deleteBook(index)}>Delete book</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
