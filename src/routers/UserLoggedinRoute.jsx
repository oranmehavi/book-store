import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function UserLoggedinRoute({children}) {
    const { userData } = useContext(LoginContext);

    return !!userData.user ? (
      <>{children}</>
    ) : (
      <Navigate to={{ pathname: "/home" }}/>
    );
}
