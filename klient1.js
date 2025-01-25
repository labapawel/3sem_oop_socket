const ClientSocket = require('./libClient');


let klient1 = new ClientSocket("wss://localhost:3000");



klient1.io.on('connect', () => {
    klient1.rooms(['cron']);
    
    klient1.io.on('message', (room, data) => {
        console.log(`room: ${room} dane: ${data}`);
    }); 

    // klient1.io.emit('wiadomosc', "Wysyłam wiadomość do serwera");
});