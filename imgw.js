// https://danepubliczne.imgw.pl/api/data/synop/
const ClientSocket = require('./libClient');

class imgw extends ClientSocket {

    getData() {
        fetch('https://danepubliczne.imgw.pl/api/data/synop/')
            .then(response => response.json())
            .then(data => {
                this.io.emit('message', "imgw", data);
            });
    }

    constructor(host) {
        super(host);
        this.io.on('connect', () => {
            this.rooms(['cron']);
            this.getData();
        });
        this.io.on('message', (room, data) => {

            let czas = new Date(data);
            console.log(czas.toDateString());
            

            if (czas.getSeconds() < 10 && czas.getMinutes() == 10) {
                   this.getData();
            }
        });

    }
}



let klient1 = new imgw("wss://localhost:3000");

