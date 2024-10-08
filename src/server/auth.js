import { getTokenFromSessionStorage } from "../Utils/SessionStorage";

export const signup = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("cannot sign up");
    }

    const responseData = await response.json();

    return {
      token: responseData.data.token,
      user: responseData.data.user,
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("cannot sign in");
    }

    const responseData = await response.json();

    return {
      token: responseData.data.token,
      user: responseData.data.user,
    };
  } catch (error) {
    throw error;
  }
};

export const getUser = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/get", {
      signal,
      method: "GET",
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData);
    }

    return {
      user: responseData.data.user,
    };
  } catch (error) {
    throw error;
  }
};

export const editUserServer = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/edit-user", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return {
      user: responseData.data.user,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    if (!response.ok) {
      throw new Error("not authenticated");
    }
  } catch (error) {
    throw error;
  }
};

export const addToCartServer = async (item) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/add-to-cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error) {
    throw error;
  }
};

export const getBooksDataFromCartServer = async (signal) => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/cart-books", {
      signal,
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return {
      books: responseData.data.booksData,
    };
  } catch (error) {
    throw error;
  }
};

export const removeFromCartServer = async (index) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v2/user/remove-cart/${index}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenFromSessionStorage()}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) throw responseData;

    return {
      newUserData: responseData.data.updatedUser,
    };
  } catch (error) {
    throw error;
  }
};

export const editCartItemQuantityServer = async (index, newQuantity) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v2/user/edit-quantity/${index}`,
      {
        method: "PATCH",
        body: JSON.stringify({ newQuantity }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromSessionStorage()}`,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return {
      newUserData: responseData.data.updatedUser,
    };
  } catch (error) {
    throw error;
  }
};

export const clearCartServer = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v2/user/clear-cart", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return {
      newUserData: responseData.data.updatedUser,
    };
  } catch (error) {
    throw error;
  }
};
