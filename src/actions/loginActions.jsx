export const initUsersData = (users) => ({
    type: "INIT",
    users
});

export const editUserAction = (editedUser) => ({
    type: "EDIT_USER",
    editedUser
});

export const loginAction = (user) => {
    const obj = {
        type: "LOGIN",
        user
    }

    return obj;
};

export const addToCartAction = (newItem) => ({
    type: "ADD_TO_CART",
    newItem
})

export const editCart = (index, newQuantity) => ({
    type: "EDIT_CART",
    index,
    newQuantity
});

export const removeFromCart = (index) => ({
    type: "REMOVE_FROM_CART",
    index
})

export const clearCartAction = () => ({
    type: "CLEAR_CART"
});

export const logoutAction = () => ({
    type: "LOGOUT"
});