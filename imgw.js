// https://danepubliczne.imgw.pl/api/data/synop/
const ClientSocket = require('./libClient');


let klient1 = new ClientSocket("wss://localhost:3000");


klient1.io.on('connect', () => {
    klient1.rooms(['cron']);
    
    klient1.io.on('message', (room, data) => {
        let czas = new Date(data);
        if(czas.getSeconds() < 10)
        {
            fetch('https://danepubliczne.imgw.pl/api/data/synop/')
                .then(response => response.json())
                .then(data => {
                    klient1.io.emit('message', "imgw", data);
                });

        }
    }); 

    // klient1.io.emit('wiadomosc', "Wysyłam wiadomość do serwera");
});