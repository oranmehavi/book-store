import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import MainPage from "../components/MainPage/MainPage";
import UserAuthentication from "../components/Authentication/UserAuthentication";
import LoginContextProvider from "../context/LoginContext";
import AdminAuthentication from "../components/Authentication/AdminAuthentication";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import BooksContextProvider from "../context/BooksContext";
import Book from "../components/Book/Book";
import AddBook from "../components/AdminDashboard/AddBook";
import EditBook from "../components/AdminDashboard/EditBook";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <LoginContextProvider>
          <BooksContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to={"/home"} />} />

              <Route path="/home" element={<MainPage />}></Route>
              <Route path="/dashboard" element={<AdminDashboard />}></Route>
              <Route path="/dashboard/addbook" element={<AddBook />} />
              <Route path="/dashboard/editbook/:index" element={<EditBook />} />
              <Route path="/book/:id" element={<Book />} />
            
              <Route path="/authenticate" element={<UserAuthentication />} />
              <Route path="/admin" element={<AdminAuthentication />} />
              
            </Routes>
            {/* <Login /> */}
            {/* <Signup /> */}
            {/* <MainPage /> */}
            {/* <Book /> */}
          </BooksContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </>
  );
}
