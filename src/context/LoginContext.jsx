import React, { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import loginReducer, { userDataInitialState } from "../reducers/loginReducer";
import { loadAllUsers } from "../Utils/LocalStorage";
import { getUserFromCookie } from "../Utils/cookies";
import { getUser } from "../server/auth";
import { deleteTokenFromSessionStorage, getTokenFromSessionStorage } from "../Utils/SessionStorage";
import { loginAction } from "../actions/loginActions";

export const LoginContext = createContext();

export default function LoginContextProvider({ children }) {
  const cookieUserData = getUserFromCookie();
  const [userData, dispatchUserData] = useReducer(
    loginReducer,
    userDataInitialState
  );

  useEffect(() => {
    const token = getTokenFromSessionStorage();
    const controller = new AbortController();
    const signal = controller.signal;
    if (token) {

     
      getUser(signal).then((res) => {
        dispatchUserData(loginAction(res.user))
      }).catch((res) => {
        if (res.status === 400) {
          deleteTokenFromSessionStorage();
        }
      })
    }
    
    return () => {
      controller.abort();
    }
    
  }, []);


  return (
    <LoginContext.Provider value={{ userData, dispatchUserData }}>
      {children}
    </LoginContext.Provider>
  );
}
