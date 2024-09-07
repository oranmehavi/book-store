import React, { useContext, useState } from "react";
import "./Authentication.scss";
import { LoginContext } from "../../context/LoginContext";
import { loginAction } from "../../actions/loginActions";
import { getUser } from "../../Utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { saveUserOnCookie } from "../../Utils/cookies";

export default function AdminAuthentication() {
  const { userData, dispatchUserData } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validInputs, setValidInputs] = useState([false, false]);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const isFormInvalid = () => {
    return validInputs.some((inputState) => inputState === false);
  };

  const updateValidInputs = (index, isValid) => {
    const newValidInputs = [...validInputs];
    newValidInputs[index] = isValid;
    setValidInputs(newValidInputs);
  };

  const onEmailBlur = (e) => {
    const emailInput = e.target.value.trim();
    if (emailInput === "") {
      updateValidInputs(0, false);
      setEmailError("Email should not be empty");
    } else {
      setEmail(emailInput);
      updateValidInputs(0, true);
    }
  };

  const onPasswordBlur = (e) => {
    const passwordInput = e.target.value.trim();
    if (passwordInput === "") {
      updateValidInputs(1, false);
      setPasswordError("Password should not be empty");
    } else {
      setPassword(passwordInput);
      updateValidInputs(1, true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const res = getUser(formData.email, formData.password);
    if (!res.isError) {
      if (res.user.isAdmin) {
        setLoginError("");
        dispatchUserData(loginAction(res.user));
        saveUserOnCookie({ user: res.user });
        navigate("/dashboard");
      }
      else {
        setLoginError("No permission");
      }
    }
    else {
      setLoginError(res.errorMessage);
    }
  };

  return (
    <div className="authentication-container">
      <div className="authentication-form__container">
        <div className="authentication-form">
          <h3>Admin login</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" name="email" onBlur={onEmailBlur}/>
            {!validInputs[0] && (
              <h4 className="invalid-message">{emailError}</h4>
            )}
            <input type="password" placeholder="password" name="password" onBlur={onPasswordBlur}/>
            {!validInputs[1] && (
              <h4 className="invalid-message">{passwordError}</h4>
            )}
            {loginError !== "" && <div className="error-message">{loginError}</div>}
            <div className="nav">
              <button type="submit" disabled={isFormInvalid()}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
