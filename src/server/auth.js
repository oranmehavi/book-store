import { getTokenFromSessionStorage } from "../Utils/SessionStorage";

export const signup = async (userData) => {
  try {
    const response = await fetch("https://localhost:7103/api/users", {
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
    const response = await fetch("https://localhost:7103/api/users/login", {
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
    const response = await fetch("https://localhost:7103/api/users", {
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
    const response = await fetch("https://localhost:7103/api/users", {
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
    const response = await fetch("https://localhost:7103/api/users", {
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
    const response = await fetch("https://localhost:7103/api/cart", {
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
    const response = await fetch("https://localhost:7103/api/cart", {
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
      `https://localhost:7103/api/cart/${index}`
      ,
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
      `https://localhost:7103/api/cart/${index}?` + new URLSearchParams({
        newQuantity
      }),
      {
        method: "PATCH",
        headers: {
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
    const response = await fetch("https://localhost:7103/api/cart", {
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
