const { connect } = require('http2');
const io = require('socket.io-client');

class ClientSocket {
    socket;
    constructor(address = "wss://"){
        this.socket = io(address,{
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: 5,
            connect_timeout: 5000,
            timeout: 5000,
            connect: true,
            secure: false,
            rejectUnauthorized: false,
        });
      
        this.socket.connect();
    }
    get io(){
        return this.socket;
    }
}

module.exports = ClientSocket;