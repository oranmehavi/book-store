import React from "react";
import "./BookModal.scss";
export default function BookModal({
  isModalOpen,
  closeModal,
  amount,
  addToCart,
}) {
  return (
    <div
      className={
        isModalOpen ? "bookmodal-container open" : "bookmodal-container"
      }
    >
      <div className="cartmodal-main">
        <p>Are you sure you want to buy {amount} books?</p>
        <div className="buttons">
          <button onClick={() => addToCart()}>Yes</button>
          <button onClick={() => closeModal()}>No</button>
        </div>
      </div>
    </div>
  );
}
