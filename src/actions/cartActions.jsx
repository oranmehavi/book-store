export const initCart = (cart) => ({
    type: "INIT",
    cart
})

export const addToCartAction = (newItem) => ({
    type: "ADD_CART",
    newItem
})

export const editCart = (index, newQuantity) => ({
    type: "EDIT_CART",
    index,
    newQuantity
});

export const removeFromCart = (index) => ({
    type: "REMOVE_CART",
    index
})