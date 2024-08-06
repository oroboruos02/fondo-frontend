import axios from './axios'

export const registerPartnerRequest = (partner) => axios.post('/register-partner', partner);

export const getPartnersRequest = () => axios.get('/partners');

export const getProfileRequest = () => axios.get('/profile-partner');

export const changeEmailRequest = (email) => axios.put('/change-email', email);

export const changePhoneNumberRequest = (phone) => axios.put('/change-phone', phone);

export const changeAddressRequest = (address) => axios.put('/change-address', address);

export const changePasswordRequest = (data) => axios.put('/change-password', data);

export const resetPasswordRequest = (id) => axios.put('/reset-password', id);

export const disablePartnerRequest = (id) => axios.put(`/disable-partner/${id}`);