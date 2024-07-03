/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getUsersRequest, registerUserRequest } from "../api/user";

const UserContext = createContext();

export const useUser = () => {

    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context
}

export function UserProvider ({ children }) {

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const registerUser = async (user) => {
        try {
            const res = await registerUserRequest(user);
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return(
        <UserContext.Provider value={{
            users,
            errors,
            setUsers,
            registerUser,
            getUsers
        }}>
            { children }
        </UserContext.Provider>
    )
}