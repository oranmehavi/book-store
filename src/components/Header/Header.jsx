import React, { useContext } from "react";
import "./Header.scss";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { logoutAction } from "../../actions/loginActions";

export default function Header() {
  const {userData, dispatchUserData} = useContext(LoginContext);
  const navigate = useNavigate();
  const onClickLogout = () => {
    dispatchUserData(logoutAction());
    navigate("/home");
  };
  
  return (
    <>
      <div className="header-container">
        <h1>חנות ספרים</h1>
        <input type="text" />
        <div className="buttons-container">
          {!!userData.user ? 
            <div className="logout-nav" onClick={onClickLogout}>Logout</div> : 
          <NavLink to={"/authenticate"}>Login</NavLink>}
          <button>Cart</button>
        </div>
      </div>
    </>
  );
}
