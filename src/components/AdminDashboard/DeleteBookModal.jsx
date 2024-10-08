import React from 'react'
import './DeleteBookModal.scss';

export default function DeleteBookModal({isModalOpen, closeModal, currentBookId, deleteBook}) {
  return (
    <div className={isModalOpen ? 'deletebookmodal-container open' : 'deletebookmodal-container'}>
        <div className="deletebookmodal-main">
            <p>Are you sure you want to delete this book?</p>
            <div className="buttons">
              <button onClick={() => deleteBook(currentBookId)}>Yes</button>
              <button onClick={() => closeModal()}>No</button>
            </div>
        </div>
    </div>
  )
}
