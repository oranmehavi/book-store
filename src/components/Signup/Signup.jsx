import React, { useState } from "react";
import "./Signup.scss";
import validator from "validator";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validInputs, setValidInputs] = useState([true, true, true, true]);

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

  const onEmailBlur = (e) => {
    const emailInput = e.target.value.trim();
    if (emailInput == "") {
      setEmailError("Email should not be empty");
      updateValidInputs(1, false);
    } else if (!validator.isEmail(emailInput)) {
      setEmailError("Email is not valid");
      updateValidInputs(1, false);
    } else {
      setEmail(emailInput);
      setEmailError("");
      updateValidInputs(1, true);
    }
  };

  const onPasswordBlur = (e) => {
    const passwordInput = e.target.value.trim();
    if (passwordInput === "") {
      setPasswordError("Password should not be empty");
      updateValidInputs(2, false);
    } else {

      setPassword(passwordInput);
      setPasswordError("");
      updateValidInputs(2, true);
      console.log(validInputs);
    }
  };

  const onConfirmPasswordBlur = (e) => {
    const confirmPasswordInput = e.target.value.trim();
    if (password !== "" && confirmPasswordInput !== password) {
      setConfirmPasswordError("Passwords should match");
      updateValidInputs(3, false);
    } else {
      setConfirmPassword(confirmPasswordInput);
      setConfirmPasswordError("");
      updateValidInputs(3, true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h3>Signup</h3>
        <form>
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            onBlur={onFullNameBlur}
          />
          {!validInputs[0] && (
            <h4 className="error-message">{fullNameError}</h4>
          )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            onBlur={onEmailBlur}
          />
          {!validInputs[1] && <h4 className="error-message">{emailError}</h4>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onBlur={onPasswordBlur}
          />
          {!validInputs[2] && (
            <h4 className="error-message">{passwordError}</h4>
          )}
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onBlur={onConfirmPasswordBlur}
          />
          {!validInputs[3] && (
            <h4 className="error-message">{confirmPasswordError}</h4>
          )}
          <button>Signup!</button>
        </form>
      </div>
    </div>
  );
}

/* const formdata = new Formdata(event?.target);

fomr= Object.fromEntries(formdata); */
