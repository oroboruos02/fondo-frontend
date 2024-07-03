import axios from './axios'

export const registerPartnerRequest = (partner) => axios.post('/register-partner', partner);

export const getPartnersRequest = () => axios.get('/partners');