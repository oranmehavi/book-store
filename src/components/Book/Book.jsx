import React, { useContext, useEffect, useState } from "react";

import "./Book.scss";
import { BooksContext } from "../../context/BooksContext";
import { useParams } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { addToCartInLocalStorage, getBookByID } from "../../Utils/LocalStorage";
import { CartContext } from "../../context/CartContext";
import { addToCartAction, editCart } from "../../actions/cartActions";

export default function Book() {
  // const { booksState } = useContext(BooksContext);
  const { userData } = useContext(LoginContext);
  const { cartState, cartDispatch} = useContext(CartContext);
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
    if (amount > 1) setAmount(amount - 1);
  };

  const addToCart = () => {
    const res = addToCartInLocalStorage({id, bookName: bookData.book.bookName, image: bookData.book.image, quantity: amount});
    if (!res.isNew) {
      cartDispatch(editCart(res.index, res.newQuantity));
    }
    else {
      cartDispatch(addToCartAction({id, bookName: bookData.book.bookName, image: bookData.book.image, quantity: amount}));
    }

    alert(`Added ${amount} books to cart`);
  };
  
  return (
    <>
      {bookData?.book && (
        <div className="book-container">
          <div className="details-and-purchase">
            <p>{bookData.book.summary}</p>
            <div className="purchase-section">
              <div className="purchase-money">
                <button onClick={() => addToCart()}>Add to cart!</button>
                <h4>
                  {!!userData.user
                    ? (
                        bookData.book.priceAfterDiscount
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
                <input type="text" defaultValue={1} value={amount} disabled/>
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
