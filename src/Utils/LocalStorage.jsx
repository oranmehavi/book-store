import { initialBooks } from "../data/initialBooks";

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

export const deleteFromLocalStorage = (index) => {
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