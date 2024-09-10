import React, { useContext, useEffect, useState } from "react";

import "./Book.scss";
import { BooksContext } from "../../context/BooksContext";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { addToCartInLocalStorage, getBookByID } from "../../Utils/LocalStorage";
import { CartContext } from "../../context/CartContext";
import { addToCartAction, editCart } from "../../actions/loginActions";
import { saveUserOnCookie } from "../../Utils/cookies";
import BookModal from "./BookModal";

export default function Book() {
  const { userData, dispatchUserData } = useContext(LoginContext);
  const [bookData, setBookData] = useState(null);
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const res = getBookByID(id);
    if (res.isError === false) {
      setBookData(res.bookData);
    }
    else if (res.isError) {
      navigate("/*", {replace: true});
    }
  }, []);

  const increaseAmount = () => {
    if (amount < 15) setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) setAmount(amount - 1);
  };

  const addToCart = () => {
    const res = addToCartInLocalStorage(userData, {id, bookName: bookData.book.bookName, image: bookData.book.image, quantity: amount});
    console.log(res);
    if (!res.isNew) {
      dispatchUserData(editCart(res.index, res.newQuantity));
      saveUserOnCookie(res.newUserData);
    }
    else {
      dispatchUserData(addToCartAction({id, bookName: bookData.book.bookName, image: bookData.book.image, quantity: amount}));
      saveUserOnCookie(res.newUserData);
    }
    // closeModal();
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      {bookData?.book && (
        <div className="book-container">
          <div className="details-and-purchase">
            <p>{bookData.book.summary}</p>
            <div className="purchase-section">
              <div className="purchase-money">
                <button className="purchase-button" onClick={() => openModal()} disabled={!userData.user || (!!userData.user && userData.user.isAdmin)}>Add to cart!</button>
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
          <BookModal isModalOpen={isModalOpen} amount={amount} closeModal={closeModal} addToCart={addToCart}/>
        </div>
      )}
    </>
  );
}
