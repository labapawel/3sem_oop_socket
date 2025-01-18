

class nazwaKlasy {
    constructor() {
        this.nazwa = "Nazwa klasy";
    }

    get aaa() { 
        return this.nazwa;
    }
    metoda() {
        console.log(`Metoda ${this.nazwa}`);
    }
}


class nowa extends nazwaKlasy {
    constructor() {
        super();
        this.nazwa = "Nowa nazwa klasy";
    }
}

let instancja = new nowa();
instancja.metoda();

console.log(instancja.aaa);
