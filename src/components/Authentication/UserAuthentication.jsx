import React, { useState } from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function UserAuthentication() {
    const [isLoginMode, setIsLoginMode] = useState(true);
  return (
    <div className="authentication-container">
        <div className="authentication-form__container">
            {isLoginMode ? <LoginForm 
            setIsLoginMode={setIsLoginMode}
            /> : <SignupForm  setIsLoginMode={setIsLoginMode}/>}
        </div>
    </div>
  )
}
