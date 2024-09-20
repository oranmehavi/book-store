import React, { useContext, useEffect, useReducer, useState } from "react";
import "./MainPage.scss";
import { initialBooks } from "../../data/initialBooks";
import booksReducer from "../../reducers/booksReducer";
import { loadAllBooks } from "../../Utils/LocalStorage";
import { initBooks } from "../../actions/booksAction";
import { BooksContext } from "../../context/BooksContext";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import SearchBooks from "./SearchBooks";
import "./SearchBooks.scss";
import { getBooksFromServer } from "../../server/books";

export default function MainPage() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const [shownBooks, setShownBooks] = useState([]);
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [currentBooksInPage, setCurrentBooksInPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);
  const { userData } = useContext(LoginContext);
  const navigate = useNavigate();
  // const [booksState, booksDispatch] = useReducer(booksReducer, []);


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getBooksFromServer(undefined, 1, signal).then(res => {
      setShownBooks([...res.books])
      setTotalBooksCount(res.length)
    })

    return () => {
      controller.abort();
    }
  }, []);

  // useEffect(() => {
  //   if (booksState.books) setShownBooks([...booksState.books]);
  // }, [booksState.books]);

  useEffect(() => {
    // const indexOfLastBook = currentPage * booksPerPage;
    // const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // setCurrentBooksInPage(shownBooks.slice(indexOfFirstBook, indexOfLastBook));
    const controller = new AbortController();
    const signal = controller.signal;
    getBooksFromServer(undefined, currentPage, signal).then(res => {
      setShownBooks([...res.books])
      setTotalBooksCount(res.length)
    })
  }, [shownBooks, currentPage, booksPerPage]);

  const navigateToBookPage = (id) => {
    navigate(`/book/${id}`);
  };

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
      <SearchBooks searchBooks={searchBooks} />
      <div className="mainpage-container">
        <div className="books-container">
          {shownBooks?.map((book, index) => (
            <div
              key={book.id}
              className="book"
              onClick={() => navigateToBookPage(book.id)}
            >
              <img src={book.image} alt="" />
              <h4>{book.bookName}</h4>
              <h4>{book.author}</h4>
              {!!userData.user && book.discount > 0 && (
                <h5 className="price-before">
                  {book.price.toLocaleString("he-IL", {
                    style: "currency",
                    currency: "ILS",
                  })}
                </h5>
              )}
              <h4>
                {!!userData.user
                  ? book.priceAfterDiscount.toLocaleString("he-IL", {
                      style: "currency",
                      currency: "ILS",
                    })
                  : book.price.toLocaleString("he-IL", {
                      style: "currency",
                      currency: "ILS",
                    })}
              </h4>
            </div>
          ))}
        </div>
        
      </div>
      <div>
          
            <div className="pagination">
              {Array.from({
                length: Math.ceil(totalBooksCount / booksPerPage),
              }).map((_, index) => (
                <div key={index}>
                  <button onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? "selected" : ""}>
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
        
        </div>
    </>
  );
}
