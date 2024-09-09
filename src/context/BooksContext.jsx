import React, { createContext, useEffect, useReducer } from "react";
import booksReducer from "../reducers/booksReducer";
import { initBooks } from "../actions/booksAction";
import { loadAllBooks } from "../Utils/LocalStorage";
import { Outlet } from "react-router-dom";

export const BooksContext = createContext();

export default function BooksContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(booksReducer, []);

  useEffect(() => {
    const books = loadAllBooks();
    booksDispatch(initBooks(books));
  }, []);

  return (
    <BooksContext.Provider value={{ booksState, booksDispatch }}>
      {children}
    </BooksContext.Provider>
  );
}
