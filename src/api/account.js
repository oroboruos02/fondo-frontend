import axios from "./axios";

export const registerAccountRequest = (partner) => axios.post('/register-account', partner);

export const getAccountsRequest = () => axios.get('/all-accounts')

export const getAccountsPartnerRequest = () => axios.get('/my-accounts')

export const disableAccountRequest = (id) => axios.put(`/disable-account/${id}`, id)

export const getTotalInvestmentRequest = () => axios.get('/total-investment')

export const getTotalRequest = () => axios.get('/total')