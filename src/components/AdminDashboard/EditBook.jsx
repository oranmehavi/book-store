import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";

import "./EditBook.scss";
import validator from "validator";
import { editBookInLocalStorage } from "../../Utils/LocalStorage";
import { editBookAction } from "../../actions/booksAction";
export default function EditBook() {
  const { booksState , booksDispatch} = useContext(BooksContext);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [validInputs, setValidInputs] = useState([false, false]);
  const navigate = useNavigate();
  const index = useParams().index;

  const isFormInvalid = () => {
    return validInputs.some(inputState => inputState === false);
  };

  const updateValidInputs = (index, isValid) => {
    const newValidInputs = [...validInputs];
    newValidInputs[index] = isValid;
    setValidInputs(newValidInputs);
  };

  const onPriceBlur = (e) => {
    const priceInput = e.target.value.trim();
    if (priceInput === "") {
      setPriceError("Price cannot be empty");
      updateValidInputs(0, false);
    } else if (!validator.isDecimal(priceInput)) {
      setPriceError("Price must be a decimal");
      updateValidInputs(0, false);
    } else {
      setPriceError("");
      updateValidInputs(0, true);
      setPrice(parseFloat(priceInput));
    }
  };

  const onDiscountBlur = (e) => {
    const discountInput = e.target.value.trim();
    if (discountInput === "") {
      setDiscountError("Discount cannot be empty");
      updateValidInputs(1, false);
    } else if (!validator.isInt(discountInput)) {
      setDiscountError("Discount must be an integer");
      updateValidInputs(1, false);
    } else {
      setDiscountError("");
      updateValidInputs(1, true);
      setDiscount(parseFloat(discountInput));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const changes = {price: parseFloat(price), discount: parseInt(discount), priceAfterDiscount: parseFloat(price) * (100 - parseInt(discount)) / 100}
    editBookInLocalStorage(index, changes);
    booksDispatch(editBookAction(index, changes));
    navigate("/dashboard");
  };

  return (
    <div className="editbook-container">
      <div className="editbook-form__container">
        {booksState.books && <form className="editbook-form" onSubmit={handleSubmit}>
          <h3 className="title">Edit book {booksState.books[index].bookName}</h3>
          <h4>Current price: {booksState.books[index].price.toLocaleString("he-IL", {
                  style: "currency",
                  currency: "ILS",
                })}</h4>
          <input type="text" placeholder="Price" name="price" onBlur={onPriceBlur}/>
          {!validInputs[0] && (
            <h3 className="invalid-message">{priceError}</h3>
          )}
          <h4>Current discount: {booksState.books[index].discount}%</h4>
          <input type="text" placeholder="Discount" name="discount" onBlur={onDiscountBlur}/>
          {!validInputs[1] && (
            <h3 className="invalid-message">{discountError}</h3>
          )}
          <button disabled={isFormInvalid()}>Save changes</button>
        </form>}
      </div>
    </div>
  );
}
