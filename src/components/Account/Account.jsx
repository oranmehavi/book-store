import React, { useContext, useState } from "react";
import "./Account.scss";
import { LoginContext } from "../../context/LoginContext";
import { logoutAction } from "../../actions/loginActions";
import { deleteUserFromLocalStorage } from "../../Utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import EditUserModal from "../EditUserModal/EditUserModal";
import { deleteUserOnFromCookie } from "../../Utils/cookies";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteAccountModal from "./DeleteAccountModal";
import { deleteUser } from "../../server/auth";
import { deleteTokenFromSessionStorage } from "../../Utils/SessionStorage";

export default function Account() {
  const { userData, dispatchUserData } = useContext(LoginContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const deleteAccount = () => {
    deleteUser().then(() => {
      deleteTokenFromSessionStorage();
      dispatchUserData(logoutAction());
      navigate("/home");
    })
    // deleteUserFromLocalStorage(userData.user);
    // deleteUserOnFromCookie();
    // dispatchUserData(logoutAction());
    // navigate("/home");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="userdetails-main">
      <div className="userdetails-container">
        <div className="userdetails">
          <div className="name-and-controls">
            <h3>Full name: {userData.user.fullname}</h3>
            <div className="controls">
              {!userData.user.isAdmin && (
                <button className="delete" onClick={() => openDeleteModal()}>
                  Delete account
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
              <button className="edit" onClick={() => openModal()}>
                Edit details
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          </div>
          <div className="details">
            <h3>Username: {userData.user.username}</h3>
            <h3>Email: {userData.user.email}</h3>
            <h3>Password: *****</h3>
          </div>
        </div>
      </div>
      <EditUserModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        user={userData.user}
        dispatchUserData={dispatchUserData}
      />
      <DeleteAccountModal isModalOpen={isDeleteModalOpen} closeModal={closeDeleteModal} deleteAccount={deleteAccount} />
    </div>
  );
}
