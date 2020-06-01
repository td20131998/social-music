import io from 'socket.io-client'

const socket = io("http://localhost:8080")

export default socket;
// let socket = null;

// const getSocket = () => socket

// const connect = () => {
//     socket = io("http://localhost:8080")
// }

// const disconnect = () => {
//     if (socket) {
//         socket.disconnect()
//     }
// }
// const GlobalSocket = {
//     connect,
//     disconnect,
//     getSocket
// }
// export default GlobalSocket