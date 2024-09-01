import React, { useState } from "react";
import "./Login.scss";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validInputs, setValidInputs] = useState([true, true]);

  const updateValidInputs = (index, isValid) => {
    const newValidInputs = [...validInputs];
    newValidInputs[index] = isValid;
    setValidInputs(newValidInputs);
  };

  const onEmailBlur = (e) => {
    const emailInput = e.target.value.trim();
    if (emailInput === '') {
      updateValidInputs(0, false);
      setEmailError("Email should not be empty");
    }
    else {
      setEmail(emailInput);
      updateValidInputs(0, true);
    }
  };

  const onPasswordBlur = (e) => {
    const passwordInput = e.target.value.trim();
    if (passwordInput === '') {
      updateValidInputs(1, false);
      setPasswordError("Password should not be empty");
    }
    else {
      setPassword(passwordInput);
      updateValidInputs(1, true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Login</h3>
        <form>
          <input type="text" placeholder="email" onBlur={onEmailBlur}/>
          {!validInputs[0] && <h3 className="error-message">{emailError}</h3>}
          <input type="text" placeholder="password" onBlur={onPasswordBlur}/>
          {!validInputs[1] && <h3 className="error-message">{passwordError}</h3>}
          <button>Login!</button>
        </form>
      </div>
    </div>
  );
}
