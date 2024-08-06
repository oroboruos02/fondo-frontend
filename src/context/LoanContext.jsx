import { createContext, useContext, useState } from "react";
import { approveLoanRequest, denyLoanRequest, extendLoanRequest, getLoansPartnerRequest, getLoansRequest, payOffLoanRequest, registerApplicationLoanRequest } from "../api/loan";

const LoanContext = createContext();

export const useLoan = () => {

    const context = useContext(LoanContext);

    if(!context) {
        throw new Error("useLoan must be used within a LoanProvider");
    }

    return context
}

export function LoanProvider ({ children }) {

    const [loans, setLoans] = useState([]);
    const [myLoans, setMyLoans] = useState([]);
    const [errors, setErrors] = useState([]);

    const getLoans = async () => {
        try {
            const res = await getLoansRequest();
            setLoans(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const registerLoan = async (loan) => {
        try {
            const res = await registerApplicationLoanRequest(loan);
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const getMyLoansPartner = async() => {
        try {
            const res = await getLoansPartnerRequest();
            setMyLoans(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const approveLoan = async(data) => {
        try {
            const res = await approveLoanRequest(data)
            console.log(res);
            return true
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const denyLoan = async(id) => {

        try {
            const res= await denyLoanRequest(id)
            console.log(res);
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const extendLoan = async(data) => {
        try {
            const res = await extendLoanRequest(data)
            console.log(res);
            return true
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const payOffLoan = async(id) => {
        try {
            const res = await payOffLoanRequest(id);
            console.log(res);
            return true
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    return(
        <LoanContext.Provider value={{
            loans,
            myLoans,
            errors,
            getLoans,
            getMyLoansPartner,
            registerLoan,
            approveLoan,
            denyLoan,
            extendLoan,
            payOffLoan
        }}>
            { children }
        </LoanContext.Provider>
    )
}