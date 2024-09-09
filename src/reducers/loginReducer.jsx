export const userDataInitialState = { user: null };

const loginReducer = (userData, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: { ...action.user } };

    case "EDIT_USER":
      return {
        user: {
          ...action.editedUser,
        },
      };

    case "ADD_TO_CART":
      console.log("ADD_TO_CART");
      return {
        user: {
          ...userData.user,
          cart: userData.user.cart.concat(action.newItem),
        },
      };

    case "EDIT_CART":
      let newCart = [...userData.user.cart];
      newCart[action.index] = {
        ...newCart[action.index],
        quantity: action.newQuantity,
      };
      return {
        user: {
          ...userData.user,
          cart: newCart,
        },
      };
    case "REMOVE_FROM_CART":
      let newCartArr = [...userData.user.cart];
      newCartArr.splice(action.index, 1);
      return {
        user: {
          ...userData.user,
          cart: newCartArr,
        },
      };

    case "CLEAR_CART":
      return {
        user : {
          ...userData.user,
          cart: []
        }
      }
    case "LOGOUT":
      return { user: null };

    default:
      return { ...userData };
  }
};

export default loginReducer;
