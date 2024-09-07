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
import CartContextProvider from "../context/CartContext";
import Cart from "../components/Cart/Cart";
import Account from "../components/Account/Account";
import AdminRoute from "./AdminRoute";
import LoginRoute from "./LoginRoute";
import AdminLoginRoute from "./AdminLoginRoute";
import UserLoggedinRoute from "./UserLoggedinRoute";
import PageNotFound from "../PageNotFound/PageNotFound";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <LoginContextProvider>
          <BooksContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to={"/home"} />} />
              <Route
                path="/account"
                element={
                  <UserLoggedinRoute>
                    <Account />
                  </UserLoggedinRoute>
                }
              />
              <Route path="/home" element={<MainPage />} />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/dashboard/addbook"
                element={
                  <AdminRoute>
                    <AddBook />
                  </AdminRoute>
                }
              />
              <Route
                path="/dashboard/editbook/:index"
                element={
                  <AdminRoute>
                    <EditBook />
                  </AdminRoute>
                }
              />
              <Route
                path="/book/:id"
                element={
                  <CartContextProvider>
                    <Book />
                  </CartContextProvider>
                }
              />

              <Route
                path="/cart"
                element={
                  <CartContextProvider>
                    <Cart />
                  </CartContextProvider>
                }
              />

              <Route
                path="/authenticate"
                element={
                  <LoginRoute>
                    <UserAuthentication />
                  </LoginRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminLoginRoute>
                    <AdminAuthentication />
                  </AdminLoginRoute>
                }
              />
              <Route path="*" element={<PageNotFound />}/>
            </Routes>
          </BooksContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </>
  );
}
