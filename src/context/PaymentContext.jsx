import { createContext, useContext, useState } from "react";
import { getPaymentsRequest, getPaymentsPartnerRequest, approvePaymentRequest, uploadPaymentReceiptRequest, editPaymentReceiptRequest } from "../api/payment";

const PaymentContext = createContext();

export const usePayment = () => {

    const context = useContext(PaymentContext);

    if(!context) {
        throw new Error("usePayment must be used within a PaymentProvider");
    }

    return context
}

export function PaymentProvider ({ children }) {

    const [payments, setPayments] = useState([]);
    const [myPayments, setMyPayments] = useState([]);

    const getPayments = async () => {
        try {
            const res = await getPaymentsRequest();
            setPayments(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getMyPaymentsPartner = async() => {
        try {
            const res = await getPaymentsPartnerRequest();
            setMyPayments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadPaymentReceipt = async (payment) => {

        const formData = new FormData();

        formData.append('idPayment', payment.idPayment)
        formData.append('dateOfPayment', payment.dateOfPayment)
        formData.append('lateness', payment.lateness)
        formData.append('image', payment.image[0])
        
        try {
            const res = await uploadPaymentReceiptRequest(formData)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const editPaymentReceipt = async (payment) => {

        const formData = new FormData();

        formData.append('idPayment', payment.idPayment)
        formData.append('image', payment.image[0])

        try {
            const res = await editPaymentReceiptRequest(formData)
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const approvePayment = async(id) => {

        try {
            const res= await approvePaymentRequest(id)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PaymentContext.Provider value={{
            payments,
            myPayments,
            getPayments,
            getMyPaymentsPartner,
            uploadPaymentReceipt,
            editPaymentReceipt,
            approvePayment
        }}>
            { children }
        </PaymentContext.Provider>
    )
}