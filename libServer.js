const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const io = require('socket.io');



class ServerSocket {
    app = express();
    server = null;
    io = null; // socket.io
    port = 3000;    
    wartosc = 0;
    dane = {};

    get io(){
        return this.io;
    }

    methods(){
         this.io.on('connection', (socket) => {

            socket.on('rooms', (data) => {
                // dołącz do pokoju
                data.forEach(pokoj => {
                    socket.join(pokoj);
                    socket.emit('message', pokoj, this.dane[pokoj]);
                });
            });

            socket.on('message', (rooms, data) => {
                this.dane[rooms] = data; // zapisz dane do pokoju, w pamięci
                this.io.to(rooms).emit('message', rooms, data );
            })

         });
    }

    init(){
        let options = {
            key: fs.readFileSync('ssl/ssl.key'),
            cert: fs.readFileSync('ssl/ssl.crt')
        };

        this.app.use(express.static('public'));
        this.app.use(cors({
                origin: '*',
                methods: ['GET','POST']
            }));
        this.server = https.createServer(options, this.app); 
        this.io = io(this.server,{cors:
                    {origin:"*"

                    }
                });    

    }

    constructor(){

        this.init();
        this.methods();


        this.server.listen(this.port, () => {
            console.log('Server is running on http://localhost:' + this.port);
        });
    }
}

module.exports = ServerSocket;