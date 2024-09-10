import React, { useState } from "react";
import "./BookModal.scss";
export default function BookModal({
  isModalOpen,
  closeModal,
  amount,
  addToCart,
}) {
  const [hasBought, setHasBought] = useState(false);

  const buy = () => {
    addToCart();
    setHasBought(true);
  };

  return (
    <div
      className={
        isModalOpen ? "bookmodal-container open" : "bookmodal-container"
      }
    >
      <div className="bookmodal-main">
        {!hasBought ? (
          <div>
            <p>Are you sure you want to buy {amount} books?</p>
            <div className="buttons">
              <button onClick={() => buy()}>Yes</button>
              <button onClick={() => closeModal()}>No</button>
            </div>
          </div>
        ) : (
          <div>
            <p>You added the book to cart</p>
            <button
              onClick={() => {
                closeModal();
                setHasBought(false);
              }}
              className="bought"
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
