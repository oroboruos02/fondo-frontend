import axios from './axios'

export const registerContributionRequest = () => axios.post('/register-contributions');

export const getContributionsRequest = () => axios.get('/all-contributions');

export const getContributionsPartnerRequest = () => axios.get('/my-contributions');

export const approveContributionRequest = (id) => axios.put(`/approve-contribution/${id}`)

export const uploadPaymentReceiptRequest = (contribution) => axios.put('/upload-image', contribution, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export const editPaymentReceiptRequest = (contribution) => axios.put('/edit-image', contribution, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})