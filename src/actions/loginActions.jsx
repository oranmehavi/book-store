export const initUsersData = (users) => ({
    type: "INIT",
    users
});

export const editUserAction = (editedUser) => ({
    type: "EDIT_USER",
    editedUser
});

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