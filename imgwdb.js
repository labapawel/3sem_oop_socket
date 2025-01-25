const ClientSocket = require('./libClient');
const mysql = require('mysql2');


class imgwdb extends ClientSocket {

    constructor(host) {
        super(host);
        this.io.on('connect', () => {
            this.rooms(['imgw']);
        });
        this.io.on('message', (room, data1) => {

            if(data1 == null) return;

            console.log(data1);
            let q = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'meteo'
            });
           // q.connect();
            data1.forEach(data => {


                q.query('INSERT INTO `imgw` (`id_stacji`, `stacja`, `temperatura`, `wilgotnosc_wzgledna`, `cisnienie`, `kierunek_wiatru`, `predkosc_wiatru`) VALUES (?,?,?,?,?,?,?)', 
                    [data.id_stacji, data.stacja, data.temperatura, data.wilgotnosc_wzgledna, (data.cisnienie || 0), data.kierunek_wiatru, data.predkosc_wiatru], function(err, results, fields) {
                    if (err) {
                        console.log(err);
                    }
                });

                
            });
            q.end();

        });

    }
}



let klient1 = new imgwdb("wss://localhost:3000");

