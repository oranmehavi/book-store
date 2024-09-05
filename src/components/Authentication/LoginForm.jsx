import React, { useContext, useState } from "react";
import './Authentication.scss';
import { getUser } from "../../Utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { loginAction } from "../../actions/loginActions";
export default function LoginForm(props) {
    const {dispatchUserData} = useContext(LoginContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [validInputs, setValidInputs] = useState([false, false]);
    const navigate = useNavigate();
    
    const isFormInvalid = () => {
        return validInputs.some(inputState => inputState === false);
    }
    
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
    
    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log
      const formData = Object.fromEntries(new FormData(e.target).entries());
      const res = getUser(formData.email, formData.password);
      if (res.isError) {

      }
      else {
        dispatchUserData(loginAction(res.user));
        navigate('/home');
      }
    }
    return (
        <div className="authentication-form">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" name="email" onBlur={onEmailBlur}/>
            {!validInputs[0] && <h3 className="invalid-message">{emailError}</h3>}
            <input type="password" placeholder="password" name="password" onBlur={onPasswordBlur}/>
            {!validInputs[1] && <h3 className="invalid-message">{passwordError}</h3>}
            <div className="nav">
            <button type="submit" disabled={isFormInvalid()}>
              Login
            </button>
            <div onClick={onClickSubscribe}>Subscribe</div>
          </div>
          </form>
        </div>
    );
}
