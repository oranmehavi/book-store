import React, { useContext, useState } from "react";
import "./AddBook.scss";
import validator from "validator";
import { addBook } from "../../Utils/LocalStorage";
import { BooksContext } from "../../context/BooksContext";
import { addBookAction } from "../../actions/booksAction";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { addBookServer } from "../../server/books";

export default function AddBook() {
  const { booksDispatch } = useContext(BooksContext);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [discount, setDiscount] = useState("");
  const [booknameError, setBooknameError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [validInputs, setValidInputs] = useState([
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const [addBookError, setAddBookError] = useState("");
  const navigate = useNavigate();
  const isFormInvalid = () => {
    return validInputs.some((inputState) => inputState === false);
  };

  const updateValidInputs = (index, isValid) => {
    const newValidInputs = [...validInputs];
    newValidInputs[index] = isValid;
    setValidInputs(newValidInputs);
  };

  const onBooknameBlur = (e) => {
    const booknameInput = e.target.value.trim();
    if (booknameInput === "") {
      setBooknameError("Book name cannot be empty");
      updateValidInputs(0, false);
    } else {
      setBooknameError("");
      updateValidInputs(0, true);
      setBookName(booknameInput);
    }
  };

  const onAuthorBlur = (e) => {
    const authorInput = e.target.value.trim();
    if (authorInput === "") {
      setAuthorError("Author name cannot be empty");
      updateValidInputs(1, false);
    } else {
      setAuthorError("");
      updateValidInputs(1, true);
      setAuthor(authorInput);
    }
  };

  const onSummaryBlur = (e) => {
    const summaryInput = e.target.value.trim();
    if (summaryInput === "") {
      setSummaryError("Summary cannot be empty");
      updateValidInputs(2, false);
    } else {
      setSummaryError("");
      updateValidInputs(2, true);
      setSummary(summaryInput);
    }
  };

  const onPriceBlur = (e) => {
    const priceInput = e.target.value.trim();
    if (priceInput === "") {
      setPriceError("Price cannot be empty");
      updateValidInputs(3, false);
    } else if (!validator.isDecimal(priceInput)) {
      setPriceError("Price must be a decimal");
      updateValidInputs(3, false);
    }
    else if (priceInput < 1) {
      setPriceError("Price cannot be below 1");
      updateValidInputs(3, false);
    } else {
      setPriceError("");
      updateValidInputs(3, true);
      setPrice(parseFloat(priceInput));
    }
  };

  const onUrlBlur = (e) => {
    const urlInput = e.target.value.trim();
    if (urlInput === "") {
      setImageUrlError("Image url cannot be empty");
      updateValidInputs(4, false);
    } else if (!validator.isURL(urlInput)) {
      setImageUrlError("url is invalid");
      updateValidInputs(4, false);
    } else {
      setImageUrlError("");
      updateValidInputs(4, true);
      setImageUrl(urlInput);
    }
  };

  const onDiscountBlur = (e) => {
    const discountInput = e.target.value.trim();
    if (discountInput === "") {
      setDiscountError("Discount cannot be empty");
      updateValidInputs(5, false);
    } else if (!validator.isInt(discountInput)) {
      setDiscountError("Discount must be an integer");
      updateValidInputs(5, false);
    }
    else if (discountInput < 0 || discountInput > 100) {
      setDiscountError("Discount must be between 0 and 100");
      updateValidInputs(5, false);
    }
    else {
      setDiscountError("");
      updateValidInputs(5, true);
      setDiscount(parseFloat(discountInput));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const book = {
      ...formData,
      price: parseFloat(price),
      discount: parseFloat(discount)
    };

    addBookServer(book).then(() => {
      setAddBookError("");
      navigate("/dashboard");
    }).catch((error) =>{
      console.log(error)
      setAddBookError(error.statusText);
    })
    // const res = addBook(book);
    // if (res.isError) {
    //   setAddBookError(res.errorMessage);
    // } else {
    //   setAddBookError("");
    //   booksDispatch(addBookAction(res.book));
    //   navigate("/dashboard");
    // }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-form__container">
        <form className="addbook-form" onSubmit={handleSubmit}>
          <h3 className="title">New book info</h3>
          <input
            type="text"
            placeholder="Book name"
            name="bookName"
            onChange={onBooknameBlur}
          />
          {!validInputs[0] && (
            <h3 className="invalid-message">{booknameError}</h3>
          )}
          <input
            type="text"
            placeholder="Author"
            name="author"
            onChange={onAuthorBlur}
          />
          {!validInputs[1] && (
            <h3 className="invalid-message">{authorError}</h3>
          )}
          <textarea
            placeholder="Summary"
            name="summary"
            onChange={onSummaryBlur}
          />
          {!validInputs[2] && (
            <h3 className="invalid-message">{summaryError}</h3>
          )}
          <input
            type="text"
            placeholder="Price"
            name="price"
            onChange={onPriceBlur}
          />
          {!validInputs[3] && <h3 className="invalid-message">{priceError}</h3>}
          <input
            type="text"
            placeholder="Image url"
            name="image"
            onChange={onUrlBlur}
          />
          {!validInputs[4] && (
            <h3 className="invalid-message">{imageUrlError}</h3>
          )}
          <input
            type="text"
            placeholder="Discount"
            name="discount"
            onChange={onDiscountBlur}
          />
          {!validInputs[5] && (
            <h3 className="invalid-message">{discountError}</h3>
          )}
          {addBookError !== "" && (
            <div className="error-message">{addBookError}</div>
          )}
          <div className="buttons">
            <button disabled={isFormInvalid()}>Add book</button>
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
