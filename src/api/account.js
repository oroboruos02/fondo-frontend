import axios from "./axios";

export const registerAccountRequest = (partner) => axios.post('/register-account', partner);

export const getAccountsRequest = () => axios.get('/all-accounts')

export const getAccountsPartnerRequest = () => axios.get('/my-accounts')