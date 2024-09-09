import React, { createContext, useContext, useEffect, useReducer } from 'react'
import cartReducer from '../reducers/cartReducer';
import { loadCartFromLocalStorage } from '../Utils/LocalStorage';
import { initCart } from '../actions/cartActions';
import { LoginContext } from './LoginContext';

export const CartContext = createContext();

export default function CartContextProvider({children}) {
    const {userData} = useContext(LoginContext);
    const [cartState, cartDispatch] = useReducer(cartReducer, {cart: userData.user.cart});
    // useEffect(() => {
    //   const cart = loadCartFromLocalStorage();
    //   cartDispatch(initCart(cart || []));
    // }, []);
  return (
        <CartContext.Provider value={{cartState, cartDispatch}}>
            {children}
        </CartContext.Provider>
  )
}
