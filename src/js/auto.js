class auto {
    id;
    tiempoLlegada;
    tiempoCobro;
    tiempoPreEnjuague;
    tiempoLavado;
    tiempoSecado;
    constructor(id){
        this.id=id;
    }
    set tiempoLlegada(tiempoLlegada){
        this.tiempoLlegada=tiempoLlegada;
    }
    set tiempoCobro(tiempoCobro){
        this.tiempoCobro=tiempoCobro;
    }
    set tiempoPreEnjuague(tiempoPreEnjuague){
        this.tiempoPreEnjuague=tiempoPreEnjuague;
    }
    set tiempoLavado(tiempoLavado){
        this.tiempoLavado=tiempoLavado;
    }
    set tiempoSecado(tiempoSecado){
        this.tiempoSecado=tiempoSecado;
    }
    get tiempoLlegada(){
        return this.tiempoLlegada;
    }
    get tiempoCobro(){
        return this.tiempoCobro;
    }
    get tiempoPreEnjuague(){
        return this.tiempoPreEnjuague;
    }
    get tiempoLavado(){
        return this.tiempoLavado;
    }
    get tiempoSecado(){
        return this.tiempoSecado;
    }
}