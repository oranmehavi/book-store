import React from "react";
import "./Header.scss";
export default function Header() {
  return (
    <>
      <div className="header-container">
        <h1>חנות ספרים</h1>
        <input type="text" />
        <div className="buttons-container">
          <button>Login</button>
          <button>Signup</button>
          <button>Cart</button>
        </div>
      </div>
    </>
  );
}
