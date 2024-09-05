import React, { useContext, useEffect, useState } from "react";

import "./Book.scss";
import { BooksContext } from "../../context/BooksContext";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { getBookByID } from "../../Utils/LocalStorage";

export default function Book() {
  // const { booksState } = useContext(BooksContext);
  const { userData } = useContext(LoginContext);
  const [bookData, setBookData] = useState(null);
  const [amount, setAmount] = useState(1);
  const id = useParams().id;

  useEffect(() => {
    const res = getBookByID(id);
    if (res.isError === false) {
      setBookData(res.bookData);
    }
  }, []);

  const increaseAmount = () => {
    if (amount < 15) setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 0) setAmount(amount - 1);
  };

  return (
    <>
      {bookData?.book && (
        <div className="book-container">
          <div className="details-and-purchase">
            <p>{bookData.book.summary}</p>
            <div className="purchase-section">
              <div className="purchase-money">
                <button>Purchase!</button>
                <h4>
                  {!!userData.user
                    ? (
                        (bookData.book.price *
                          (100 - bookData.book.discount)) /
                        100
                      ).toLocaleString("he-IL", {
                        style: "currency",
                        currency: "ILS",
                      })
                    : bookData.book.price.toLocaleString("he-IL", {
                        style: "currency",
                        currency: "ILS",
                      })}
                </h4>
                <h5 className="price-before">
                  {!!userData.user &&
                    bookData.book.discount > 0 &&
                    bookData.book.price.toLocaleString("he-IL", {
                      style: "currency",
                      currency: "ILS",
                    })}
                </h5>
              </div>
              <div className="amount-controller">
                <button onClick={() => increaseAmount()}>+</button>
                <input type="text" defaultValue={1} value={amount} />
                <button onClick={() => decreaseAmount()}>-</button>
              </div>
            </div>
          </div>

          <img src={bookData.book.image} alt="" />
        </div>
      )}
    </>
  );
}
