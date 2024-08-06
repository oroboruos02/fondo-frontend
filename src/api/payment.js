import axios from './axios';

export const getPaymentsRequest = () => axios.get('/all-payments');

export const getPaymentsPartnerRequest = () => axios.get('/my-payments');

export const approvePaymentRequest = (id) => axios.put(`/approve-payment/${id}`);

export const uploadPaymentReceiptRequest = (payment) => axios.put('/upload-image-payment', payment, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const editPaymentReceiptRequest = (payment) => axios.put('/edit-image-payment', payment, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})