/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { registerContributionRequest, getContributionsRequest, getContributionsPartnerRequest, approveContributionRequest, editPaymentReceiptRequest, uploadPaymentReceiptRequest } from "../api/contribution";

const ContributionContext = createContext();

export const useContribution = () => {

    const context = useContext(ContributionContext);

    if(!context) {
        throw new Error("useContribution must be used within a ContributionProvider");
    }

    return context
}

export function ContributionProvider ({ children }) {

    const [errors, setErrors] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [myContributions, setMyContributions] = useState([])

    const getContributions = async () => {
        try {
            const res = await getContributionsRequest();
            setContributions(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const registerContribution = async () => {
        try {
            const res = await registerContributionRequest();
            console.log(res);
            return true;
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const uploadPaymentReceipt = async (contribution) => {

        const formData = new FormData();

        formData.append('idContribution', contribution.idContribution)
        formData.append('dateOfPayment', contribution.dateOfPayment)
        formData.append('lateness', contribution.lateness)
        formData.append('image', contribution.image[0])
        
        try {
            const res = await uploadPaymentReceiptRequest(formData)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const editPaymentReceipt = async (contribution) => {

        const formData = new FormData();

        formData.append('idContribution', contribution.idContribution)
        formData.append('image', contribution.image[0])

        try {
            const res = await editPaymentReceiptRequest(formData)
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const getMyContributionsPartner = async() => {
        try {
            const res = await getContributionsPartnerRequest();
            setMyContributions(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const approveContribution = async(id) => {

        try {
            await approveContributionRequest(id)
            setContributions(prevContributions => 
                prevContributions.map(contribution => 
                    contribution.idContribution === id ? { ...contribution, isPaid: true} : contribution
                )
            )
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
        <ContributionContext.Provider value={{
            contributions,
            myContributions,
            errors,
            getContributions,
            getMyContributionsPartner,
            registerContribution,
            approveContribution,
            uploadPaymentReceipt,
            editPaymentReceipt
        }}>
            { children }
        </ContributionContext.Provider>
    )
}