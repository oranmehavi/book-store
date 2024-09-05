export const loginAction = (user) => {
    const obj = {
        type: "LOGIN",
        user
    }

    return obj;
};

export const logoutAction = () => ({
    type: "LOGOUT"
});