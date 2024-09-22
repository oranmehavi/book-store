import { getTokenFromSessionStorage } from "../Utils/SessionStorage";

export const signup = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/signup", {
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
    const response = await fetch("http://localhost:3000/api/users/login", {
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
    const response = await fetch("http://localhost:3000/api/users/get-user", {
      signal,
      method: "POST",
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

export const logout = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
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

export const editUserServer = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/edit", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`
      }
    })

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return {
      user: responseData.data.user
    }
  } catch (error) { 
    throw error; 
  }
};

export const deleteUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`
      }
    })

    if (!response.ok) {
      throw new Error("not authenticated")
    }
  } catch (error) {
    throw error;
  }
}

export const addToCartServer = async (item) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/add-cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromSessionStorage()}`
      }
    })

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData;
    }

    return responseData.data;
  } catch (error) {
    throw error;
  }
}

export const getBooksDataFromCartServer = async (signal) => { 
  try {
    const response = await fetch("http://localhost:3000/api/users/cart-books", {
      signal,
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`
      }
    })

    const responseData = await response.json();
    
    if (!response.ok) {
      throw responseData;
    }

    return {
      books: responseData.data.booksData
    }
  } catch (error) {
    throw error;
  }

}

export const removeFromCartServer = async (index) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/remove-cart", {
      method: "POST",
      body: JSON.stringify({index}),
      headers: {
        Authorization: `Bearer ${getTokenFromSessionStorage()}`,
        "Content-Type": "application/json"
      }
    })

    const responseData = await response.json();

    if (!response.ok)
      throw responseData;

    return {
      newUserData: responseData.data.updatedUser
    }
  } catch (error) {
    throw error;
  }
};