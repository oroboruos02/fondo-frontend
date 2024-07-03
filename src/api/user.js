import axios from './axios'

export const registerUserRequest = (user) => axios.post('/register-user', user);

export const getUsersRequest = () => axios.get('/users');