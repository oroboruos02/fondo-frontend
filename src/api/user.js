import axios from './axios'

export const registerUserRequest = (user) => axios.post('/register-user', user);

export const getUsersRequest = () => axios.get('/users');

export const getProfileUserRequest = () => axios.get('/profile-user');

export const disableUserRequest = (id) => axios.put(`/disable-user/${id}`)

export const changePasswordUserRequest = (data) => axios.put('/change-password-user', data);

export const resetPasswordUserRequest = (id) => axios.put('/reset-password-user', id);