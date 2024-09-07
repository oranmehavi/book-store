export const userDataInitialState = {user: null};

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN":
            return {user: {...action.user}}
        
        case "EDIT_USER":
            return {
                user: {
                    ...action.editedUser
                }
            }
        case "LOGOUT":
            return {user: null};
        
        default:
            return {...userData};
    }
};

export default loginReducer;