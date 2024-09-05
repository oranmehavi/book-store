import React, { useContext, useState } from "react";
import "./Authentication.scss";
import { LoginContext } from "../../context/LoginContext";
import { loginAction } from "../../actions/loginActions";

export default function AdminAuthentication() {
  const { userData, dispatchUserData } = useContext(LoginContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    if (formData.email === "admin@admin" && formData.password === "admin")
    {
        const adminUser = {...formData, fullname: "moshe moshe", username: "admin"}
        dispatchUserData(loginAction(formData));

    }
    
  };

  return (
    <div className="authentication-container">
      <div className="authentication-form__container">
        <div className="authentication-form">
          <h3>Admin login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              name="email"
            />
            {/* {!validInputs[0] && <h3 className="invalid-message">{emailError}</h3>} */}
            <input
              type="password"
              placeholder="password"
              name="password"
            />
            {/* {!validInputs[1] && <h3 className="invalid-message">{passwordError}</h3>} */}
            <div className="nav">
              <button type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
