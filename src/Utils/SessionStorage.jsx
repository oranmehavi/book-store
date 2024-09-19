export const saveTokenInSessionStorage = (token) => {
    sessionStorage.setItem("token", token);
}

export const getTokenFromSessionStorage = () => {
    const token = sessionStorage.getItem("token");
    
    if (!token)
        return null;

    return token;
}

export const deleteTokenFromSessionStorage = () => {
    sessionStorage.removeItem("token");
}