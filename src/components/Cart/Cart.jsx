import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";
import {
  editCartItemQuantity,
  getListOfBooksByIds,
  removeFromCartInLocalStorage,
} from "../../Utils/LocalStorage";
import { LoginContext } from "../../context/LoginContext";
import { editCart, removeFromCart } from "../../actions/cartActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart() {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { userData } = useContext(LoginContext);
  const [booksList, setBooksList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

  useEffect(() => {
    if (cartState.cart)
      setBooksList(getListOfBooksByIds(cartState?.cart.map((item) => item.id)));
    calculateTotals(booksList, cartState.cart);
  }, [cartState.cart]);

  useEffect(() => {
    calculateTotals(booksList, cartState.cart);
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
    }
  };

  const increaseQuantity = (index) => {
    if (cartState.cart[index].quantity < 15) {
      editCartItemQuantity(index, cartState.cart[index].quantity + 1);
      cartDispatch(editCart(index, cartState.cart[index].quantity + 1));
    }
  };

  const decreaseQuantity = (index) => {
    if (cartState.cart[index].quantity > 1) {
      editCartItemQuantity(index, cartState.cart[index].quantity - 1);
      cartDispatch(editCart(index, cartState.cart[index].quantity - 1));
    }
  };

  const remove = (index) => {
    removeFromCartInLocalStorage(index);
    cartDispatch(removeFromCart(index));
  };

  const isCartEmpty = () => {
    if (cartState.cart)
      return cartState.cart.length === 0;
  };
  const buy = () => {
    alert("You bought the books");
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart">
          {booksList.length > 0 &&
            cartState.cart.map((item, index) => (
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
          <button onClick={() => buy()} disabled={isCartEmpty()}>
            Buy
          </button>
        )}
      </div>
    </>
  );
}
