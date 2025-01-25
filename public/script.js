const $ = e => document.querySelector(e);

Number.prototype.Z = function () {
    return this.toString().padStart(2, '0');
}


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
        this.events();


        this.socket.connect();

    }
    get io(){
        return this.socket;
    }

    events(){
        this.io.on('connect', () => {
            socket.rooms(['imgw', 'cron']);
        })
        .on('message', (nazwa, dane) => {

            let czas = new Date();
            console.log(nazwa, czas);
            $('.time').innerHTML = `${czas.getHours()}<span class="dk">:</span>${czas.getMinutes().Z()}`;
            $('.date').innerText = `${czas.getDate().Z()}.${(czas.getMonth()+1).Z()}.${czas.getFullYear()}`;


            if(dane != null && nazwa == 'imgw'){
                this.imgwDb = dane.filter(st=>st.id_stacji == 12600)[0];
                console.log(this.imgwDb);
                $('.temperatura').innerText = `${this.imgwDb.temperatura}°C`;
                $('.wilgotnosc_wzgledna').innerText = `${this.imgwDb.wilgotnosc_wzgledna}%`;
                $('.kierunek_wiatru').innerText = `${this.imgwDb.kierunek_wiatru}°`;
                $('.predkosc_wiatru').innerText = `${this.imgwDb.predkosc_wiatru} m/s`;
                $('.cisnienie').innerText = `${this.imgwDb.cisnienie} hPa`;
                $('.stacja').innerText = `${this.imgwDb.stacja}`;
                
            }
        })


    }

    rooms( room ){
        this.socket.emit('rooms', room);
    }
}

let socket = new ClientSocketImgw("wss://");

