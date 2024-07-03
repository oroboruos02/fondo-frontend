/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { loginRequestPartner, verifyTokenPartnerRequest } from "../api/authPartner";
import Cookies from 'js-cookie';

export const AuthPartnerContext = createContext();

export const useAuthPartner = () => { 
    const context = useContext(AuthPartnerContext);
    if(!context) {
        throw new Error("useAuthPartner must be within an AuthPartnerProvider")
    }
    return context;
}

export const AuthPartnerProvider = ({ children }) => {

    const [partner, setPartner] = useState(null);
    const [isAuthenticatedPartner, setIsAuthenticatePartner] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signin = async (partner) => {
        try {
            const res = await loginRequestPartner(partner);
            setIsAuthenticatePartner(true);
            setPartner(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)) {
            return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Cookies.remove("_token");
        setIsAuthenticatePartner(false)
        setPartner(null)
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

            if(!cookies._token) {
                setIsAuthenticatePartner(false);
                setLoading(false);
                return setPartner(null);
            }

            try {
                const res = await verifyTokenPartnerRequest(cookies.token);
                if(!res.data) {
                    setIsAuthenticatePartner(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticatePartner(true);
                setPartner(res.data);
                setLoading(false)
            } catch (error) {
                setIsAuthenticatePartner(false);
                setPartner(null);
                setLoading(false)
            }
        }
        checkLogin();
    }, [])

    return( 
        <AuthPartnerContext.Provider value={{
            signin,
            logout,
            loading,
            partner,
            isAuthenticatedPartner,
            errors
        }}>
            { children }
        </AuthPartnerContext.Provider>
    )
}