export const initBooks = (books) => ({
    type: "INIT",
    books
})

export const addBookAction = (book) => ({
    type: "ADD_BOOK",
    book
})

export const removeBookAction = (index) => ({
    type: "REMOVE_BOOK",
    index
})

export const editBookAction = (index, changes) => ({
    type: "EDIT_BOOK",
    index,
    changes
});