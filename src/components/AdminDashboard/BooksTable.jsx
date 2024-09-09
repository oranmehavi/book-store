import React from "react";
import { useNavigate } from "react-router-dom";
import "./BooksTable.scss";
import { deleteBookFromLocalStorage } from "../../Utils/LocalStorage";
import { removeBookAction } from "../../actions/booksAction";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BooksTable({ books, booksDispatch }) {
  const navigate = useNavigate();

  const navigateToBookEdit = (index) => {
    navigate(`/dashboard/editbook/${index}`);
  };

  const deleteBook = (index) => {
    const res = confirm("Are you sure you want to delete the book");
    if (res) {
      deleteBookFromLocalStorage(index);
      booksDispatch(removeBookAction(index));
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Book id</th>
          <th>Book name</th>
          <th>Author</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Price after discount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book.id}>
            <td>
              <span className="cell-header">Book ID:</span> {book.id}
            </td>
            <td>
              <span className="cell-header">Book name:</span> {book.bookName}
            </td>
            <td>
              <span className="cell-header">Author:</span>
              {book.author}
            </td>
            <td>
              <span className="cell-header">Price:</span>
              {book.price.toLocaleString("he-IL", {
                style: "currency",
                currency: "ILS",
              })}
            </td>
            <td>
              <span className="cell-header">Discount:</span>
              {book.discount}%
            </td>
            <td>
              <span className="cell-header">Price after discount:</span>
              {book.priceAfterDiscount.toLocaleString("he-IL", {
                style: "currency",
                currency: "ILS",
              })}
            </td>
            <td className="actions">
              <span className="cell-header">Actions:</span>
              <div className="buttons">
                <button
                  className="edit"
                  onClick={() => navigateToBookEdit(index)}
                >
                  Edit book
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="delete" onClick={() => deleteBook(index)}>
                  Delete book
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
