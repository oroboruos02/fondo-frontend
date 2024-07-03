/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getAccountsPartnerRequest, getAccountsRequest, registerAccountRequest } from "../api/account";

const AccountContext = createContext();

export const useAccount = () => {

    const context = useContext(AccountContext);

    if(!context) {
        throw new Error("useAccount must be used within a AccountProvider");
    }

    return context
}

export function AccountProvider ({ children }) {

    const [errors, setErrors] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [myAccounts, setMyaccounts] = useState([])

    const getAccounts = async () => {
        try {
            const res = await getAccountsRequest();
            setAccounts(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const registerAccount = async (partner) => {
        try {
            const res = await registerAccountRequest(partner);
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const getMyAccountsPartner = async() => {
        try {
            const res = await getAccountsPartnerRequest();
            setMyaccounts(res.data)
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

    return(
        <AccountContext.Provider value={{
            accounts,
            myAccounts,
            errors,
            getAccounts,
            getMyAccountsPartner,
            registerAccount,
        }}>
            { children }
        </AccountContext.Provider>
    )
}