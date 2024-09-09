import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";
import {
  clearCart,
  editCartItemQuantity,
  getListOfBooksByIds,
  removeFromCartInLocalStorage,
} from "../../Utils/LocalStorage";
import { LoginContext } from "../../context/LoginContext";
import { clearCartAction, editCart, removeFromCart } from "../../actions/loginActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveUserOnCookie } from "../../Utils/cookies";
import CartModal from "./CartModal";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  // const { cartState, cartDispatch } = useContext(CartContext);
  const { userData, dispatchUserData } = useContext(LoginContext);
  const [booksList, setBooksList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.user?.cart)
      setBooksList(
        getListOfBooksByIds(userData.user.cart.map((item) => item.id))
      );
  }, [userData.user?.cart]);

  useEffect(() => {
    calculateTotals(booksList, userData.user?.cart);
  }, [booksList]);

  const calculateTotals = (booksList, cart) => {
    let totalPriceAfterDiscountF = 0;
    let totalPriceF = 0;
    if (booksList.length > 0) {
      for (const [index, item] of cart.entries()) {
        totalPriceF += item.quantity * booksList[index].book.price;
        totalPriceAfterDiscountF +=
          item.quantity * booksList[index].book.priceAfterDiscount;
      }
      setTotalPrice(totalPriceF);
      setTotalPriceAfterDiscount(totalPriceAfterDiscountF);
    } else {
      setTotalPrice(0);
      setTotalPriceAfterDiscount(0);
    }
  };

  const increaseQuantity = (index) => {
    if (userData.user.cart[index].quantity < 15) {
      const res = editCartItemQuantity(
        userData,
        index,
        userData.user.cart[index].quantity + 1
      );
      if (!res.isError) {
        dispatchUserData(editCart(index, userData.user.cart[index].quantity + 1));
        saveUserOnCookie(res.newUserData);
      }
    }
  };

  const decreaseQuantity = (index) => {
    if (userData.user.cart[index].quantity > 1) {
      const res = editCartItemQuantity(
        userData,
        index,
        userData.user.cart[index].quantity - 1
      );
      if (!res.isError) {
        dispatchUserData(editCart(index, userData.user.cart[index].quantity - 1));
        saveUserOnCookie(res.newUserData);
      }
    }
  };

  const remove = (index) => {
    const res = removeFromCartInLocalStorage(userData, index);
    if (!res.isError) {
      dispatchUserData(removeFromCart(index));
      saveUserOnCookie(res.newUserData);
    }
  };

  const isCartEmpty = () => {
    return userData.user.cart.length === 0;
  };

  const confirmation = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }
  
  const buy  = () => {
    const res = clearCart(userData);
    if (!res.isError) {
      dispatchUserData(clearCartAction());
      saveUserOnCookie(res.newUserData);
      navigate("/home")
    }
  };
  
  return (
    <>
      <div className="cart-container">
        <div className="cart">
          {booksList.length > 0 &&
            userData.user?.cart.map((item, index) => (
              <div className="cart-item">
                <img src={booksList[index].book.image} alt="" />
                <h4>{booksList[index].book.bookName}</h4>
                <h5 className="price-before">
                  {!!userData.user &&
                    booksList[index].book.discount > 0 &&
                    (
                      booksList[index].book.price * item.quantity
                    ).toLocaleString("he-IL", {
                      style: "currency",
                      currency: "ILS",
                    })}
                </h5>
                <h4>
                  {!!userData.user
                    ? (
                        booksList[index].book.priceAfterDiscount * item.quantity
                      ).toLocaleString("he-IL", {
                        style: "currency",
                        currency: "ILS",
                      })
                    : (
                        booksList[index].book.price * item.quantity
                      ).toLocaleString("he-IL", {
                        style: "currency",
                        currency: "ILS",
                      })}
                </h4>
                <div className="controls">
                  <button onClick={() => increaseQuantity(index)}>+</button>
                  <input type="text" value={item.quantity} disabled />
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <button className="delete" onClick={() => remove(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <CartModal isModalOpen={isModalOpen} closeModal={closeModal} buy={buy}/>
      </div>
      <div className="total-price">
        <h3 className="total">
          Total price:{" "}
          {!!userData.user
            ? totalPriceAfterDiscount.toLocaleString("he-IL", {
                style: "currency",
                currency: "ILS",
              })
            : totalPrice.toLocaleString("he-IL", {
                style: "currency",
                currency: "ILS",
              })}
        </h3>
        {!!userData.user && (
          <button onClick={() => confirmation()} disabled={isCartEmpty()}>
            Buy
          </button>
        )}
      </div>
      
    </>
  );
}
