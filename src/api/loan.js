import axios from "./axios";

export const registerApplicationLoanRequest = (loan) => axios.post('/loan-application', loan);

export const getLoansRequest = () => axios.get('/all-loans')

export const getLoansPartnerRequest = () => axios.get('/my-loans')

export const approveLoanRequest = (data) => axios.put('/approve-loan', data)

export const denyLoanRequest = (id) => axios.delete(`/deny-loan/${id}`)

export const extendLoanRequest = (data) => axios.post('/extend-loan', data)

export const payOffLoanRequest = (id) => axios.post(`/payoff-loan/${id}`)