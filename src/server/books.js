import { getTokenFromSessionStorage } from "../Utils/SessionStorage";

export const getBooksFromServer = async (value, page, signal) => {
  try {
    const response = await fetch("http://localhost:3000/api/books/get-books", {
      signal,
      method: "POST",
      body: JSON.stringify({ value, page }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("unable to get books");
    }

    const responseData = await response.json();

    return {
      books: responseData.data.books,
      length: responseData.data.length,
    };
  } catch (error) {
    throw error;
  }
};

export const getBookByIDFromServer = async (id, signal) => {
  try {
    const response = await fetch("http://localhost:3000/api/books/book-id", {
      signal,
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData);
    }

    return {
      book: responseData.data.book,
    };
  } catch (error) {
    throw error;
  }
};

export const addBookServer = async (bookData) => {
  try {
    const response = await fetch("http://localhost:3000/api/books/new", {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteBookServer = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/books/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData);
    }
  } catch (error) {
    throw error;
  }
};

export const editBookServer = async (id, changes) => {
  try {
    const response = await fetch("http://localhost:3000/api/books/edit", {
      method: "POST",
      body: JSON.stringify({ id, changes }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }
  } catch (error) {
    throw error;
  }
};
