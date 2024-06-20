/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, verifyTokenUserRequest } from "../api/authUser";
import Cookies from 'js-cookie';

export const AuthUserContext = createContext();

export const useAuthUser = () => { 
    const context = useContext(AuthUserContext);
    if(!context) {
        throw new Error("useAuthUser must be within an AuthUserProvider")
    }
    return context;
}

export const AuthUserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticate] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticate(true);
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticate(false)
        setUser(null)
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if(!cookies.token) {
                setIsAuthenticate(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenUserRequest(cookies.token);
                if(!res.data) {
                    setIsAuthenticate(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticate(true);
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                setIsAuthenticate(false);
                setUser(null);
                setLoading(false)
            }
        }
        checkLogin();
    }, [])

    return( 
        <AuthUserContext.Provider value={{
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            { children }
        </AuthUserContext.Provider>
    )
}