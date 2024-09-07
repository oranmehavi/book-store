import { initialBooks } from "../data/initialBooks";
import { initialUsers } from "../data/users";

export const loadAllUsers = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
        insertInitialUsersToStorage();
    }
};

const insertInitialUsersToStorage = () => {
    localStorage.setItem("users", JSON.stringify(initialUsers));
};

export const getUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users == null || !users.some(user => user.email === email))
    {
        return {isError: true, errorMessage: "Email does not exist", user: null};
    }
    else if (!users.some(user => user.email === email && user.password === password))
    {
        return {isError: true, errorMessage: "Password is incorrect", user: null};
    }
    else {
        for (const user of users) {
            if (user.email === email)
                return {isError: false, errorMessage: "", user};
        }
    }    
};

export const addUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === newUser.email))
    {
        return {isError: true, errorMessage: "User already exists", user: null};
    }
    else {
        const newUsers = [...users];
        newUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(newUsers));
        return {isError: false, errorMessage: "", user: newUser};
    }
}

export const editUserInLocalStorage = (editedUser) => {
    const users = JSON.parse(localStorage.getItem('users'));
    for (const [index, user] of users.entries()) {
        if (user.id === editedUser.id) {
            users[index] = {...editedUser};
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
};

export const deleteUserFromLocalStorage = (userToDelete) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const newUsers = [...users];
    for (const [index, user] of newUsers.entries()) {
        if (user.id === userToDelete.id) {
            newUsers.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(newUsers));
        }
    }
};

export const loadAllBooks = () => {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books == null)
    {
        insertInitialBooksToStorage();
        return initialBooks;
    }   
    else
        return books;
    
}

const insertInitialBooksToStorage = () => {
    localStorage.setItem('books', JSON.stringify(initialBooks));
}

export const addBook = (newBook) => {
    const books = JSON.parse(localStorage.getItem('books'));
    let found = false;
    for (const book of books) {
        if (book.bookName === newBook.bookName) {
            found = true;
            break;
        }
    }

    if (found === true) 
        return {isError: true, errorMessage: "Book already exists", book: null};
    else{
        const newBooks = [...books];
        newBooks.push(newBook);
        localStorage.setItem('books', JSON.stringify(newBooks))
        return {isError: false, errorMessage: "", book: newBook};
    }
    
}


export const editBookInLocalStorage = (index, changes) => {
    const books = JSON.parse(localStorage.getItem('books'));
    const newBooks = [...books];
    newBooks[index] = {...newBooks[index], ...changes};
    localStorage.setItem('books', JSON.stringify(newBooks));
}

export const deleteBookFromLocalStorage = (index) => {
    const books = JSON.parse(localStorage.getItem('books'));
    const newBooks = [...books];
    newBooks.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(newBooks));
}

export const getBookByID = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    for (const [index, book] of books.entries()){
        if (book.id === id)
            return {isError: false, errorMessage: "", bookData: {index, book}}
    }

    return {isError: true, errorMessage: "Book not found", bookData: null};
}

export const getListOfBooksByIds = (idList) => {
    const booksList = [];
    for (const id of idList) {
        const res = getBookByID(id);
        booksList.push(res.bookData);
    }
    return booksList;
};

export const loadCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
}
export const addToCartInLocalStorage = (newItem) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        localStorage.setItem('cart', JSON.stringify([]));
        cart = [];
    }

    for (const [index, item] of cart.entries()) {
        if (item.id === newItem.id) {
            item.quantity += newItem.quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            return {
                isError: false,
                errorMessage: "",
                isNew: false,
                index,
                newQuantity: item.quantity     
            }
        }
    }

    cart.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    return {
        isError: false,
        errorMessage: "",
        isNew: true,
        index: -1
    }
}

export const removeFromCartInLocalStorage = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
}

export const editCartItemQuantity = (index, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = [...cart];
    newCart[index] = {...cart[index], quantity: newQuantity};
    localStorage.setItem("cart", JSON.stringify(newCart))
};


