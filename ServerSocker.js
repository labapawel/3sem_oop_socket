const ServerSocket = require('./libServer.js');


let server = new ServerSocket();

server.io.on('connection', (socket) => {
    socket.emit('message', 'Witaj, jesteś połączony z serwerem 1234');

    socket.on('wiadomosc', (data) => {
        console.log(`Klient ${socket.id} wysłał: ${data}`);
    });

});