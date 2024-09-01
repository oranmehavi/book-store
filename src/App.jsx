import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header />
     <Login />
    {/* <Signup /> */}
    </>
  )
}

export default App
