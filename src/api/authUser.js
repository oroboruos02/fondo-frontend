import axios from "./axios";

export const loginRequest = (user) => axios.post('/login-user', user)

export const verifyTokenUserRequest = () => axios.get('/verify-user')