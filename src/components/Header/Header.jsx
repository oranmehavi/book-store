import React, { useContext } from "react";
import "./Header.scss";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { logoutAction } from "../../actions/loginActions";
import { deleteUserOnFromCookie } from "../../Utils/cookies";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../server/auth";
import { deleteTokenFromSessionStorage } from "../../Utils/SessionStorage";
export default function Header() {
  const { userData, dispatchUserData } = useContext(LoginContext);
  const navigate = useNavigate();
  const onClickLogout = () => {
    dispatchUserData(logoutAction());
    deleteTokenFromSessionStorage();
    navigate("/home");
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="header-container">
        <div className="title" onClick={() => goHome()}>
          <FontAwesomeIcon icon={faBook} className="icon" />
          <h1>חנות ספרים</h1>
        </div>

        <div className="header-nav">
          {!!userData.user ? (
            <div className="logout-nav" onClick={onClickLogout}>
              Logout
            </div>
          ) : (
            <NavLink
              to={"/authenticate"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Login
            </NavLink>
          )}
          {!!userData.user && !userData.user.isAdmin && <NavLink
            to={"/cart"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Cart
          </NavLink>}
          {!!userData.user && !userData.user.isAdmin && (
            <NavLink
              to={"/account"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Account
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
