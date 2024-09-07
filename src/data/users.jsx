import { nanoid } from "nanoid";

export const initialUsers = [
    {
        id: nanoid(),
        fullname: "moshe moshe",
        username: "admin",
        email: "admin@admin",
        password: "admin",
        isAdmin: true
    }
]