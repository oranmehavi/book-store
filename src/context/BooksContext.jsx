import React, { createContext, useEffect, useReducer } from "react";
import booksReducer from "../reducers/booksReducer";
import { loadAllBooks } from "../Utils/LocalStorage";

export const BooksContext = createContext();

export default function BooksContextProvider({ children }) {
  const [booksState, booksDispatch] = useReducer(booksReducer, {books: loadAllBooks()});

  return (
    <BooksContext.Provider value={{ booksState, booksDispatch }}>
      {children}
    </BooksContext.Provider>
  );
}
