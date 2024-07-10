import axios from './axios'

export const registerPartnerRequest = (partner) => axios.post('/register-partner', partner);

export const getPartnersRequest = () => axios.get('/partners');

export const changePasswordRequest = (data) => axios.put('/change-password', data);

export const resetPasswordRequest = (id) => axios.put('/reset-password', id);