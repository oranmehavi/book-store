import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function AdminRoute({children}) {
    const { userData } = useContext(LoginContext);

    return !!userData.user && userData.user.isAdmin ? (
      <>{children}</>
    ) : (
      <Navigate to={{ pathname: "/home" }}/>
    );
}
