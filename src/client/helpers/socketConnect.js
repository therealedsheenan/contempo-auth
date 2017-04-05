import io from 'socket.io-client'
const secret = 'http://localhost:3001'

export const socketConnect = io(secret)
