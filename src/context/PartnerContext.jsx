/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { changePasswordRequest, getPartnersRequest, registerPartnerRequest, resetPasswordRequest } from "../api/partner";

const PartnerContext = createContext();

export const usePartner = () => {

    const context = useContext(PartnerContext);

    if(!context) {
        throw new Error("usePartner must be used within a PartnerProvider");
    }

    return context
}

export function PartnerProvider ({ children }) {

    const [partners, setPartners] = useState([]);
    const [errors, setErrors] = useState([]);

    const getPartnes = async () => {
        try {
            const res = await getPartnersRequest();
            setPartners(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const registerPartner = async (partner) => {
        try {
            const res = await registerPartnerRequest(partner);
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const changePassword = async (data) => {
        try {
            const res = await changePasswordRequest(data)
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
            const res = await resetPasswordRequest(id);
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
        <PartnerContext.Provider value={{
            partners,
            errors,
            setPartners,
            registerPartner,
            getPartnes,
            changePassword,
            resetPassword
        }}>
            { children }
        </PartnerContext.Provider>
    )
}