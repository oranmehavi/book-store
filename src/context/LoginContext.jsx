import React, { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import loginReducer, { userDataInitialState } from "../reducers/loginReducer";
import { loadAllUsers } from "../Utils/LocalStorage";
import { getUserFromCookie } from "../Utils/cookies";

export const LoginContext = createContext();

export default function LoginContextProvider({ children }) {
  const cookieUserData = getUserFromCookie();
  const [userData, dispatchUserData] = useReducer(
    loginReducer,
    cookieUserData || userDataInitialState
  );
  useEffect(() => {
    loadAllUsers();
  }, []);
  return (
    <LoginContext.Provider value={{ userData, dispatchUserData }}>
      {children}
    </LoginContext.Provider>
  );
}
