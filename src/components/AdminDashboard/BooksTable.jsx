import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BooksTable.scss";
import { deleteBookFromLocalStorage } from "../../Utils/LocalStorage";
import { removeBookAction } from "../../actions/booksAction";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteBookModal from "./DeleteBookModal";
import { deleteBookServer } from "../../server/books";

export default function BooksTable({ books, booksDispatch, updateBooks }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(0);

  const navigateToBookEdit = (index) => {
    navigate(`/dashboard/editbook/${index}`);
  };

  const deleteBook = (id) => {
    // deleteBookFromLocalStorage(index);
    // booksDispatch(removeBookAction(index));
    deleteBookServer(id).then(() => {
      updateBooks();
    });
    closeModal();
  };

  const openModal = (id) => {
    setCurrentBookId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/dashboard");
  };

  return (
    <>
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
                <span className="cell-header">Book ID:</span> {book._id}
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
                    onClick={() => navigateToBookEdit(book._id)}
                  >
                    Edit book
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => openModal(book._id)}
                  >
                    Delete book
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteBookModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        currentBookId={currentBookId}
        deleteBook={deleteBook}
      />
    </>
  );
}
