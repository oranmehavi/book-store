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

export default function MainPage() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const [shownBooks, setShownBooks] = useState([]);
  const { userData } = useContext(LoginContext);
  const navigate = useNavigate();
  // const [booksState, booksDispatch] = useReducer(booksReducer, []);

  useEffect(() => {
    if (booksState.books)
      setShownBooks([...booksState.books]);
  }, [booksState.books]);
  
  // useEffect(() => {
  //   const books = loadAllBooks();
  //   booksDispatch(initBooks(books));
  // }, []);

  const navigateToBookPage = (id) => {
    navigate(`/book/${id}`);
  };

  const searchBooks = (searchValue) => {
    const books = [...booksState.books];
    setShownBooks(searchValue === "" ? books : books.filter((book) => book.bookName.toLowerCase().includes(searchValue)))
  };

  return (
    <div className="mainpage-container">
      <SearchBooks searchBooks={searchBooks}/>
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
                ? (book.price * (100 - book.discount) / 100).toLocaleString(
                    "he-IL",
                    {
                      style: "currency",
                      currency: "ILS",
                    }
                  )
                : book.price.toLocaleString("he-IL", {
                    style: "currency",
                    currency: "ILS",
                  })}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}
