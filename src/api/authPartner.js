import axios from "./axios";

export const loginRequestPartner = (partner) => axios.post('/login-partner', partner)

export const verifyTokenPartnerRequest = () => axios.get('/verify-partner')