import React from 'react'
import './DeleteAccountModal.scss';

export default function DeleteAccountModal({isModalOpen, closeModal, deleteAccount}) {
  return (
    <div className={isModalOpen ? 'deleteaccountmodal-container open' : 'deleteaccountmodal-container'}>
        <div className="deleteaccountmodal-main">
            <p>Are you sure you want to delete your account?</p>
            <div className="buttons">
                <button onClick={() => deleteAccount()}>Yes</button>
                <button onClick={() => closeModal()}>No</button>
            </div>
        </div>
    </div>
  )
}
