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
