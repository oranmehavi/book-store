import React, { createContext, useEffect, useReducer } from 'react'
import cartReducer from '../reducers/cartReducer';
import { loadCartFromLocalStorage } from '../Utils/LocalStorage';
import { initCart } from '../actions/cartActions';

export const CartContext = createContext();

export default function CartContextProvider({children}) {
    const [cartState, cartDispatch] = useReducer(cartReducer, []);

    useEffect(() => {
      const cart = loadCartFromLocalStorage();
      cartDispatch(initCart(cart || []));
    }, []);
  return (
        <CartContext.Provider value={{cartState, cartDispatch}}>
            {children}
        </CartContext.Provider>
  )
}
