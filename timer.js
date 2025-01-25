const ClientSocket = require('./libClient');


let klient1 = new ClientSocket("wss://localhost:3000");



setInterval(()=>{
    klient1.io.emit('message', "cron", new Date());
}, 10000);