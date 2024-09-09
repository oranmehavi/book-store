import React from 'react'
import './CartModal.scss';

export default function CartModal({isModalOpen, closeModal, buy}) {
  return (
    <div className={isModalOpen ? "cartmodal-container open" : "cartmodal-container"}>
        <div className="cartmodal-main">
            <p>Are you sure you want to buy the books?</p>
            <div className="buttons">
                <button onClick={() => buy()}>Yes</button>
                <button onClick={() => closeModal()}>No</button>
            </div>
        </div>
    </div>
  )
}
