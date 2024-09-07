import React, { useContext, useEffect } from "react";
import "./AdminDashboard.scss";
import { BooksContext } from "../../context/BooksContext";
import BooksTable from "./BooksTable";
import { useNavigate } from "react-router-dom";
import ScrollableTableContainer from "./ScrollableTableContainer";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminDashboard() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const navigate = useNavigate();

  return (
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
      <div className="bookslist-container">
        {booksState.books && (
          <ScrollableTableContainer
            books={booksState?.books}
            booksDispatch={booksDispatch}
          />
        )}
      </div>
    </div>
  );
}
