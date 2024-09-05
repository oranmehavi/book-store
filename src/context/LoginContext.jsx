import React from 'react'
import { useReducer } from 'react';
import { createContext } from 'react'
import loginReducer, { userDataInitialState } from '../reducers/loginReducer';

export const LoginContext = createContext();

export default function LoginContextProvider({children}) {

    const [userData, dispatchUserData] = useReducer(loginReducer, userDataInitialState);

  return (
    <LoginContext.Provider value={{userData, dispatchUserData}}>
        {children}
    </LoginContext.Provider>

  )
}
