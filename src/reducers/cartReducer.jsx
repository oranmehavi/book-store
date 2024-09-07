export const cartState = {
  totalPriceBeforeDiscount: 0,
  totalPrice: 0,
  cart: [],
};

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "INIT":
      return {
        cart: action.cart,
      };

    case "ADD_CART":
      return {
        ...cartState,
        cart: cartState.cart.concat(action.newItem),
      };

    case "EDIT_CART":
      let newCart = [...cartState.cart];
      newCart[action.index] = {
        ...newCart[action.index],
        quantity: action.newQuantity,
      };
      return {
        ...cartState,
        cart: newCart,
      };
    case "REMOVE_CART":
      let newCartArr = [...cartState.cart];
      newCartArr.splice(action.index, 1);
      return {
        ...cartState,
        cart: newCartArr,
      };
  }
};

export default cartReducer;
