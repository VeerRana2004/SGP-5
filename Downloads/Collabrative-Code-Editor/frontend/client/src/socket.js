
import io from 'socket.io-client';

export const initSocket = () => {
    const socket = io('http://localhost:5001'); // Replace with your server URL
    return socket;
};
