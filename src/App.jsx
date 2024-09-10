import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Book from "./components/Book/Book";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./routers/AppRouter";

function App() {

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
