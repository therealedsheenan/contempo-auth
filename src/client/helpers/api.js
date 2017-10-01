import axios from 'axios'

import { API_URL } from './constants'
import { getToken } from '../redux/authentication/utils'

const api = axios.create({
  baseURL: API_URL,
  timeout: 1000
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.post['Accept'] = 'application/json'

const Users = {
  signUp: (params) => api.post('/user/signup', params),
  getInfo: () => {
    api.defaults.headers.common['Authorization'] = getToken()
    return api.get('/users/')
  }
}

const Auth = {
  signIn: (params) => api.post('/user/signin', params)
}

export default {
  Users,
  Auth
}
