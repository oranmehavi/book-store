export const booksState = {
  books: [],
};

const booksReducer = (booksState, action) => {
  switch (action.type) {
    case "INIT":
      return {
        books: action.books,
      };

    case "ADD_BOOK":
      return {
        ...booksState,
        books: booksState.books.concat(action.book),
      };
    
    case "REMOVE_BOOK":
        let newBooksArr = [...booksState.books];
        newBooksArr.splice(action.index, 1);
        return {
            ...booksState,
            books: newBooksArr
        }
    
    case "EDIT_BOOK":
      let newBooks = [...booksState.books];
      newBooks[action.index] = {...newBooks[action.index], ...action.changes};
      return {
        ...booksState,
        books: newBooks
      }
    default:
        return {...booksState};
  }
};

export default booksReducer;