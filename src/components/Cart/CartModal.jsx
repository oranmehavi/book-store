import React, { useState } from "react";
import "./CartModal.scss";

export default function CartModal({ isModalOpen, closeModal, buy, navigate }) {
  const [hasPurchased, setHasPurchased] = useState(false);

  return (
    <div
      className={
        isModalOpen ? "cartmodal-container open" : "cartmodal-container"
      }
    >
      <div className="cartmodal-main">
        {!hasPurchased ? (
          <div>
            <p>Are you sure you want to buy the books?</p>
            <div className="buttons">
              <button onClick={() => {
                setHasPurchased(true)
                buy()
                }}>Yes</button>
              <button onClick={() => closeModal()}>No</button>
            </div>
          </div>
        ) : (
          <div>
            <p>You purchased the books.</p>
            <button
              onClick={() => {
                navigate("/home");
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
