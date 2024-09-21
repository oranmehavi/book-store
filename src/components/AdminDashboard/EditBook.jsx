import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";

import "./EditBook.scss";
import validator from "validator";
import { editBookInLocalStorage } from "../../Utils/LocalStorage";
import { editBookAction } from "../../actions/booksAction";
import { editBookServer, getBookByIDFromServer } from "../../server/books";

export default function EditBook() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const [bookData, setBookData] = useState(null);
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
  const id = useParams().id;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getBookByIDFromServer(id, signal)
      .then((res) => {
        setBookData(res.book);
        setBookName(res.book.bookName);
        setAuthor(res.book.author);
        setSummary(res.book.summary);
        setPrice(res.book.price);
        setDiscount(res.book.discount);
      })
      .catch((res) => {
        if (res.status === 404) navigate("/*", { replace: true });
      });

    return () => {
      controller.abort();
    };
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
    } else if (priceInput < 1) {
      setPriceError("Price cannot be below 1");
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
    } else if (discountInput < 0 || discountInput > 100) {
      setDiscountError("Discount must be between 0 and 100");
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
    };

    editBookServer(id, changes).then(() => {
      navigate("/dashboard");
    });
    
  };

  return (
    <div className="editbook-container">
      <div className="editbook-form__container">
          {bookData && <form className="editbook-form" onSubmit={handleSubmit}>
            <div className="title">
              <img src={bookData.image} alt="" />
              <h3>{bookData.bookName}</h3>
            </div>
            <div className="section">
              <label htmlFor="">Book name: </label>
              <input
                type="text"
                defaultValue={bookData.bookName}
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
                defaultValue={bookData.author}
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
                defaultValue={bookData.image}
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
                defaultValue={bookData.summary}
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
                defaultValue={bookData.price}
                name="price"
                onChange={onPriceBlur}
              />
              {!validInputs[4] && (
                <h3 className="invalid-message">{priceError}</h3>
              )}
            </div>

            <div className="section">
              <label>Current discount:</label>
              <input
                type="text"
                placeholder="Discount"
                name="discount"
                defaultValue={bookData.discount}
                onChange={onDiscountBlur}
              />
              {!validInputs[5] && (
                <h3 className="invalid-message">{discountError}</h3>
              )}
            </div>
            <div className="buttons">
              <button disabled={isFormInvalid()}>Save changes</button>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </button>
            </div>
          </form>}
      </div>
    </div>
  );
}
