import jwtDecode from 'jwt-decode'

export const getToken = () => localStorage.getItem('token')

export const decodeToken = (token) => jwtDecode(token)

export const removeToken = () => localStorage.removeItem('token')
