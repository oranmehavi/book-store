import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function AdminLoginRoute({children}) {
    const { userData } = useContext(LoginContext);

    return !userData.user ? (
      <>{children}</>
    ) : (
        !!userData.user && userData.user.isAdmin && <Navigate to={{ pathname: "/dashboard" }}/>
    );
}
