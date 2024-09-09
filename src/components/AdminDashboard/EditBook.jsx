import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";

import "./EditBook.scss";
import validator from "validator";
import { editBookInLocalStorage } from "../../Utils/LocalStorage";
import { editBookAction } from "../../actions/booksAction";

export default function EditBook() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [booknameError, setBooknameError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [validInputs, setValidInputs] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const navigate = useNavigate();
  const index = useParams().index;

  useEffect(() => {
    if (booksState.books) {
      setBookName(booksState.books[index].bookName);
      setAuthor(booksState.books[index].author);
      setSummary(booksState.books[index].summary);
      setPrice(booksState.books[index].price);
      setDiscount(booksState.books[index].discount);
    }
  }, []);

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
  const onUrlBlur = (e) => {
    const urlInput = e.target.value.trim();
    if (urlInput === "") {
      setImageUrlError("Image url cannot be empty");
      updateValidInputs(2, false);
    } else if (!validator.isURL(urlInput)) {
      setImageUrlError("url is invalid");
      updateValidInputs(2, false);
    } else {
      setImageUrlError("");
      updateValidInputs(2, true);
      setImageUrl(urlInput);
    }
  };

  const onSummaryBlur = (e) => {
    const summaryInput = e.target.value.trim();
    if (summaryInput === "") {
      setSummaryError("Summary cannot be empty");
      updateValidInputs(3, false);
    } else {
      setSummaryError("");
      updateValidInputs(3, true);
      setSummary(summaryInput);
    }
  };

  const onPriceBlur = (e) => {
    const priceInput = e.target.value.trim();
    if (priceInput === "") {
      setPriceError("Price cannot be empty");
      updateValidInputs(4, false);
    } else if (!validator.isDecimal(priceInput)) {
      setPriceError("Price must be a decimal");
      updateValidInputs(4, false);
    } else {
      setPriceError("");
      updateValidInputs(4, true);
      setPrice(parseFloat(priceInput));
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
    } else {
      setDiscountError("");
      updateValidInputs(5, true);
      setDiscount(parseFloat(discountInput));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const changes = {
      bookName: formData.bookName,
      author: formData.author,
      image: formData.image,
      summary: formData.summary,
      price: parseFloat(price),
      discount: parseInt(discount),
      priceAfterDiscount:
        (parseFloat(price) * (100 - parseInt(discount))) / 100,
    };
    editBookInLocalStorage(index, changes);
    booksDispatch(editBookAction(index, changes));
    navigate("/dashboard");
  };

  return (
    <div className="editbook-container">
      <div className="editbook-form__container">
        {booksState.books && (
          <form className="editbook-form" onSubmit={handleSubmit}>
            <div className="title">
              <img src={booksState.books[index].image} alt="" />
              <h3>{booksState.books[index].bookName}</h3>
            </div>
            <div className="section">
              <label htmlFor="">Book name: </label>
              <input
                type="text"
                defaultValue={booksState.books[index].bookName}
                name="bookName"
                onChange={onBooknameBlur}
              />
              {!validInputs[0] && (
                <h3 className="invalid-message">{booknameError}</h3>
              )}
            </div>
            <div className="section">
              <label htmlFor="">Author:</label>
              <input
                type="text"
                defaultValue={booksState.books[index].author}
                name="author"
                onChange={onAuthorBlur}
              />
              {!validInputs[1] && (
                <h3 className="invalid-message">{authorError}</h3>
              )}
            </div>

            <div className="section">
              <label htmlFor="">Image:</label>
              <input
                type="text"
                defaultValue={booksState.books[index].image}
                name="image"
                onChange={onUrlBlur}
              />
              {!validInputs[2] && (
                <h3 className="invalid-message">{imageUrlError}</h3>
              )}
            </div>

            <div className="section">
              <label htmlFor="">Summary:</label>
              <textarea
                type="text"
                defaultValue={booksState.books[index].summary}
                name="summary"
                onChange={onSummaryBlur}
              />
              {!validInputs[3] && (
                <h3 className="invalid-message">{summaryError}</h3>
              )}
            </div>
            <div className="section">
              <label htmlFor="">Price:</label>
              <input
                type="text"
                defaultValue={booksState.books[index].price}
                name="price"
                onChange={onPriceBlur}
              />
            </div>

            <div className="section">
              <label>Current discount:</label>
              <input
                type="text"
                placeholder="Discount"
                name="discount"
                defaultValue={booksState.books[index].discount}
                onChange={onDiscountBlur}
              />
            </div>
            {!validInputs[1] && (
              <h3 className="invalid-message">{discountError}</h3>
            )}
            <div className="buttons">
              <button disabled={isFormInvalid()}>Save changes</button>
              <button type="button" onClick={() => {navigate(-1)}}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
