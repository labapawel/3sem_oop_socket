const ClientSocket = require('./libClient');


let klient1 = new ClientSocket("wss://localhost:3000");

klient1.io.on('connect', () => {
    klient1.io.on('message', (data) => {
        console.log(data);
    }); 
    
    klient1.io.emit('wiadomosc', "Wysyłam wiadomość do serwera");
});