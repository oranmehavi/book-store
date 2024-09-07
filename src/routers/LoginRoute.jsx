import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function LoginRoute({children}) {
    const { userData } = useContext(LoginContext);

    return !!userData.user ? <Navigate to={"/home"}/> :  <>{children}</> 
}
