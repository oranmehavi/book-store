import React, { useContext, useState } from "react";
import validator from "validator";
import { addUser } from "../../Utils/LocalStorage";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/loginActions";
import { nanoid } from "nanoid";
import { saveUserOnCookie } from "../../Utils/cookies";
import { signup } from "../../server/auth";
import { saveTokenInSessionStorage } from "../../Utils/SessionStorage";

export default function SignupForm(props) {
  const {dispatchUserData} = useContext(LoginContext);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validInputs, setValidInputs] = useState([false, false, false, false, false]);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

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
    }
    else {
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
    setPassword(passwordInput);
    if (passwordInput === "") {
      setPasswordError("Password should not be empty");
      updateValidInputs(3, false);
    }
    else if (passwordInput !== "" && confirmPassword === "") {
      setPasswordError("");
      setPassword(passwordInput);
    }
    else if (confirmPassword !== "" && passwordInput !== confirmPassword){
      updateValidInputs(4, false);
      setPassword(passwordInput);
      setConfirmPasswordError("Passwords should match");
      console.log(validInputs);
    }
    else {
      setPassword(passwordInput);
      setPasswordError("");
      updatePasswordInputsStateToTrue();
      setConfirmPasswordError("");
    }
  };

  const onConfirmPasswordBlur = (e) => {
    const confirmPasswordInput = e.target.value.trim();
    setConfirmPassword(confirmPasswordInput);
    if (password !== "" && confirmPasswordInput !== password) {
      console.log("error");
      setConfirmPassword(confirmPasswordInput);
      setConfirmPasswordError("Passwords should match");
      updateValidInputs(4, false);
    } else {
      setConfirmPassword(confirmPasswordInput);
      setConfirmPasswordError("");
      updatePasswordInputsStateToTrue();
    }
  };

  const updatePasswordInputsStateToTrue = () => {
    const newValidInputs = [...validInputs];
    newValidInputs[3] = true;
    newValidInputs[4] = true;
    setValidInputs(newValidInputs);
  };

  const onClickLogin = () => {
    props.setIsLoginMode(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData =Object.fromEntries(new FormData(e.target).entries());
    const {confirmPassword, ...user} = formData;
    // const res = addUser({...user, id: nanoid(), isAdmin: false, cart: []});
    // if (res.isError) {
    //   setSignupError(res.errorMessage);
    // }
    // else {
    //   setSignupError("");
    //   dispatchUserData(loginAction(res.user));
    //   saveUserOnCookie({user: res.user})
    //   navigate("/home");
    // }
    signup(user).then((res) => {
      setSignupError("");
      dispatchUserData(loginAction(res.user));
      saveTokenInSessionStorage(res.token);
      navigate("/home");
    }).catch(() => {
      setSignupError("email or password already exist")
    });
  };

  return (

      <div className="authentication-form">
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full name"
            name="fullname"
            onChange={onFullNameBlur}
          />
          {!validInputs[0] && (
            <h4 className="invalid-message">{fullNameError}</h4>
          )}
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={onUsernameBlur}
            
          />
          {!validInputs[1] && (
            <h4 className="invalid-message">{usernameError}</h4>
          )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onEmailBlur}
          />
          {!validInputs[2] && <h4 className="invalid-message">{emailError}</h4>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onPasswordBlur}
          />
          {!validInputs[3] && (
            <h4 className="invalid-message">{passwordError}</h4>
          )}
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={onConfirmPasswordBlur}
          />
          {!validInputs[4] && (
            <h4 className="invalid-message">{confirmPasswordError}</h4>
          )}
          {signupError !== "" && <div className="error-message">{signupError}</div>}
          <div className="nav">
            <button type="submit" disabled={isFormInvalid()}>
              Signup
            </button>
            <div onClick={onClickLogin}>Login</div>
          </div>
        </form>
      </div>

  );
}
