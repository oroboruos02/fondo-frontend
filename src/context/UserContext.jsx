/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { changePasswordUserRequest, disableUserRequest, getProfileUserRequest, getUsersRequest, registerUserRequest, resetPasswordUserRequest } from "../api/user";

const UserContext = createContext();

export const useUser = () => {

    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context
}

export function UserProvider ({ children }) {

    const [user, setUser] = useState([]);
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

    const getProfileUser = async () => {
        try {
            const res = await getProfileUserRequest();
            setUser(res.data)
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

    const disableUser = async(id) => {

        try {
            const res= await disableUserRequest(id)
            console.log(res);
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const changePassword = async (data) => {
        try {
            const res = await changePasswordUserRequest(data)
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const resetPassword = async (id) => {
        try {
            const res = await resetPasswordUserRequest(id);
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
            user,
            users,
            errors,
            setUsers,
            registerUser,
            getUsers,
            disableUser,
            changePassword,
            resetPassword,
            getProfileUser
        }}>
            { children }
        </UserContext.Provider>
    )
}