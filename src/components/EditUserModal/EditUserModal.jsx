import React, { useState } from "react";
import "./EditUserModal.scss";
import validator from "validator";
import { editUserAction } from "../../actions/loginActions";
import { editUserInLocalStorage } from "../../Utils/LocalStorage";
import { editUserServer } from "../../server/auth";

export default function EditUserModal({
  user,
  dispatchUserData,
  isModalOpen,
  closeModal,
}) {
  const [fullName, setFullName] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validInputs, setValidInputs] = useState([true, true, true]);
  const [editUserError, setEditUserError] = useState("");
  const isFormInvalid = () => {
    return validInputs.some((inputState) => inputState === false);
  };

  const updateValidInputs = (index, isValid) => {
    const newValidInputs = [...validInputs];
    newValidInputs[index] = isValid;
    setValidInputs(newValidInputs);
  };
  const onFullNameBlur = (e) => {
    const fullnameInput = e.target.value.trim();
    if (fullnameInput === "") {
      setFullNameError("Full name should not be empty");
      updateValidInputs(0, false);
    } else if (validator.isAlphanumeric(fullnameInput)) {
      setFullNameError("Full name should only include letters");
      updateValidInputs(0, false);
    } else {
      setFullName(fullnameInput);
      setFullNameError("");
      updateValidInputs(0, true);
    }
  };

  const onUsernameBlur = (e) => {
    const usernameInput = e.target.value.trim();
    if (usernameInput === "") {
      setUsernameError("Username should not be empty");
      updateValidInputs(1, false);
    } else {
      setUsername(usernameInput);
      setUsernameError("");
      updateValidInputs(1, true);
    }
  };

  const onEmailBlur = (e) => {
    const emailInput = e.target.value.trim();
    if (emailInput == "") {
      setEmailError("Email should not be empty");
      updateValidInputs(2, false);
    } else if (!validator.isEmail(emailInput)) {
      setEmailError("Email is not valid");
      updateValidInputs(2, false);
    } else {
      setEmail(emailInput);
      setEmailError("");
      updateValidInputs(2, true);
    }
  };

  const onPasswordBlur = (e) => {
    const passwordInput = e.target.value.trim();
    if (passwordInput !== "") {
      setNewPassword(passwordInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const newUserData = { ...user, ...formData };
    if (newUserData.password === "") delete newUserData.password;

    editUserServer(newUserData)
      .then((res) => {
        dispatchUserData(editUserAction(newUserData));
        closeModal();
      })
      .catch(() => {
        setEditUserError("Invalid input");
      });
  };

  return (
    <div className={isModalOpen ? "modal-container open" : "modal-container"}>
      <div className="modal-form__container">
        {user && (
          <form className="modal-form" onSubmit={handleSubmit}>
            <h3>Edit details</h3>
            <input
              type="text"
              placeholder="Full name"
              defaultValue={user.fullname}
              onChange={onFullNameBlur}
              name="fullname"
            />
            {!validInputs[0] && (
              <h4 className="invalid-message">{fullNameError}</h4>
            )}
            <input
              type="text"
              placeholder="Username"
              defaultValue={user.username}
              onChange={onUsernameBlur}
              name="username"
            />
            {!validInputs[1] && (
              <h4 className="invalid-message">{usernameError}</h4>
            )}
            <input
              type="text"
              placeholder="Email"
              defaultValue={user.email}
              onChange={onEmailBlur}
              name="email"
            />
            {!validInputs[2] && (
              <h4 className="invalid-message">{emailError}</h4>
            )}
            <input
              type="password"
              placeholder="New password"
              defaultValue={user.password}
              onChange={onPasswordBlur}
              name="password"
            />
            {!validInputs[3] && (
              <h4 className="invalid-message">{passwordError}</h4>
            )}
            {editUserError !== "" && (
              <div className="error-message">{editUserError}</div>
            )}
            <div className="buttons">
              <button type="submit" disabled={isFormInvalid()}>
                Save changes
              </button>
              <button type="button" onClick={() => closeModal()}>
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
