class ClientSocketImgw {
    socket;
    imgwDb = [];
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
        this.events();
    }
    get io(){
        return this.socket;
    }

    events(){
        this.io.on('connect', () => {
            socket.rooms(['imgw']);
        })
        .on('message', (nazwa, dane) => {
            if(dane != null){
                this.imgwDb = dane;
                console.log(nazwa, dane.filter(st=>st.id_stacji == 12600));
            }
        })


    }

    rooms( room ){
        this.socket.emit('rooms', room);
    }
}

let socket = new ClientSocketImgw("wss://");

