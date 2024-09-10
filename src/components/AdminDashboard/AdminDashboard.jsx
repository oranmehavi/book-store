import React, { useContext, useEffect, useState } from "react";
import "./AdminDashboard.scss";
import { BooksContext } from "../../context/BooksContext";
import { useNavigate } from "react-router-dom";
import ScrollableTableContainer from "./ScrollableTableContainer";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TableSearchInput.scss";
import TableSearchInput from "./TableSearchInput";
export default function AdminDashboard() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const [shownBooks, setShownBooks] = useState([]);
  const [currentBooksInPage, setCurrentBooksInPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);
  const navigate = useNavigate();
  
  useEffect(() => { 
      setShownBooks(booksState.books);
  }, [booksState.books]);

  useEffect(() => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    setCurrentBooksInPage(shownBooks.slice(indexOfFirstBook, indexOfLastBook));
  }, [shownBooks, currentPage, booksPerPage]);

  const searchBooks = (searchValue) => {
    const books = [...booksState.books];
    setShownBooks(
      searchValue === ""
        ? books
        : books.filter((book) =>
            book.bookName.toLowerCase().includes(searchValue)
          )
    );
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="admindashboard-container">
        <div className="buttons-container">
          <button onClick={() => navigate("/dashboard/addbook")}>
            Add a book
            <FontAwesomeIcon icon={faBook} />
          </button>
          <button onClick={() => navigate("/account")}>
            Edit account details....
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <TableSearchInput searchBooks={searchBooks} />
        <div className="bookslist-container">
          {booksState.books && (
            <ScrollableTableContainer
              books={currentBooksInPage}
              booksDispatch={booksDispatch}
            />
          )}
        </div>    
      </div>
      <div>
          {shownBooks?.length > booksPerPage && (
            <div className="table-pagination">
              {Array.from({
                length: Math.ceil(shownBooks.length / booksPerPage),
              }).map((_, index) => (
                <div key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={index + 1 === currentPage ? "selected" : ""}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  );
}
