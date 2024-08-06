/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { changeAddressRequest, changeEmailRequest, changePasswordRequest, changePhoneNumberRequest, disablePartnerRequest, getPartnersRequest, getProfileRequest, registerPartnerRequest, resetPasswordRequest } from "../api/partner";

const PartnerContext = createContext();

export const usePartner = () => {

    const context = useContext(PartnerContext);

    if(!context) {
        throw new Error("usePartner must be used within a PartnerProvider");
    }

    return context
}

export function PartnerProvider ({ children }) {

    const [partner, setPartner] = useState([])
    const [partners, setPartners] = useState([]);
    const [errors, setErrors] = useState([]);
    const [editErrors, setEditErrors] = useState([]);

    const getPartnes = async () => {
        try {
            const res = await getPartnersRequest();
            setPartners(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getProfilePartner = async () => {
        try {
            const res = await getProfileRequest();
            setPartner(res.data)
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

    const changeEmail = async (email) => {

        try {

            const res = await changeEmailRequest(email)
            console.log(res);
            return true;
            
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setEditErrors(error.response.data)
            }
            setEditErrors([error.response.data.message])
        }
    }

    const changePhone = async (phone) => {

        try {

            const res = await changePhoneNumberRequest(phone)
            console.log(res);
            return true;
            
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setEditErrors(error.response.data)
            }
            setEditErrors([error.response.data.message])
        }
    }

    const changeAddress = async (address) => {

        try {

            const res = await changeAddressRequest(address)
            console.log(res);
            return true;
            
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setEditErrors(error.response.data)
            }
            setEditErrors([error.response.data.message])
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

    const disablePartner = async(id) => {

        try {
            const res= await disablePartnerRequest(id)
            console.log(res);
            return true
        } catch (error) {
            console.log(error)
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

    useEffect(() => {
        if(editErrors.length > 0) {
            const timer = setTimeout(() => {
                setEditErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [editErrors]);

    return(
        <PartnerContext.Provider value={{
            partner,
            partners,
            errors,
            editErrors,
            getProfilePartner,
            setPartners,
            registerPartner,
            getPartnes,
            changeEmail,
            changePhone,
            changeAddress,
            changePassword,
            resetPassword,
            disablePartner
        }}>
            { children }
        </PartnerContext.Provider>
    )
}