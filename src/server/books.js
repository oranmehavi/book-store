import { getTokenFromSessionStorage } from "../Utils/SessionStorage";

export const getBooksFromServer = async (search, page, signal) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/books?" + new URLSearchParams({
      page,
      search
    }).toString(), {
      signal,
      method: "GET",
      headers: {
        // Authorization: `Bearer ${getTokenFromSessionStorage()}`
      }
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
    const response = await fetch(`http://localhost:3000/api/v2/books/${id}`, {
      signal,
      method: "GET",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
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
    const response = await fetch("http://localhost:3000/api/v2/books/new", {
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
    const response = await fetch(`http://localhost:3000/api/v2/books/${id}`, {
      method: "DELETE",
      headers: {
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
    const response = await fetch(`http://localhost:3000/api/v2/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ changes }),
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
