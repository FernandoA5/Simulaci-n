
const TIEMPO_MAXIMO = 1000;
const LIM_FILA=4;
let tiempo=0;
let TLlegada=0;
let TCobro=0;
let TPreEnjuague=0;
let TLavado=0;
let TSecado1=0;
let TSecado2=0;

let TLlegadaTranscurrido=0;
let TCobroTranscurrido=0;
let TPreEnjuagueTranscurrido=0;
let TLavadoTranscurrido=0;
let TSecado1Transcurrido=0;
let TSecado2Transcurrido=0;

let llegadaDisponible=true;
let cobroDisponible=true;
let lavadoDisponible=true;
let preenjuagueDisponible=true;
let secado1Disponible=true;
let secado2Disponible=true;

let filaCobro=0;
let filaPreEnjuage=0;
let filaLavado=0;
let filaSecado=0;

let autos=[];


let lastUpdate = Date.now();
let myInterval = setInterval(tick, 0);
let dt = 0;
let contador=0;
let secado_empezado=false;
let comprobacion_secado_empezado=false;
let AutosTotalesAtendidos=0;
let pause=false;
let vel=1;

document.getElementById("pause").addEventListener("click", ()=>{
    pause=(pause==true)?false:true;
});
document.getElementById("increase").addEventListener("click", ()=>{
    vel++;
});
document.getElementById("decrease").addEventListener("click", ()=>{
    vel = (vel>1)?vel-1:vel;
});

function tick() {
    if(pause==false){
        let now = Date.now();
        dt = now - lastUpdate;
        if(dt>=1000/vel){
            lastUpdate=now;
            simulacion()
            contador++;
        }
    }
}

function simulacion()
{
    if (llegadaDisponible==true)  { //LLEGADA
        TLlegada=generadorLlegada(); TLlegadaTranscurrido=0;
    }
    let DeltaTLlegada = TLlegada-TLlegadaTranscurrido;llegadaDisponible=false;
    if(DeltaTLlegada==0){
        if(filaCobro < LIM_FILA){
            filaCobro++;llegadaDisponible=true;
        }
        if(filaCobro==LIM_FILA){ //SI LA FILA ESTÁ LLENA
            llegadaDisponible=true
        }
    }
    TLlegadaTranscurrido=(llegadaDisponible==false && filaCobro<LIM_FILA)?TLlegadaTranscurrido+1:TLlegadaTranscurrido;

    if(cobroDisponible==true){ //COBRO  
        TCobro=generadorCobro(); TCobroTranscurrido=0;
    }
    let DeltaTCobro= TCobro-TCobroTranscurrido;cobroDisponible=false;
    TCobroTranscurrido=(cobroDisponible==false && filaPreEnjuage<LIM_FILA && filaCobro!=0)?TCobroTranscurrido+1:TCobroTranscurrido;
    if(DeltaTCobro==0){
        if(filaPreEnjuage<LIM_FILA && filaCobro!=0){
            filaPreEnjuage++;cobroDisponible=true;
            filaCobro--;
        }
    }
    
    if(preenjuagueDisponible==true){//PREENGUAJE
        TPreEnjuague=generadorPreEnjuague(); TPreEnjuagueTranscurrido=0;
    } 
    let DeltaTPreEnjuague= TPreEnjuague-TPreEnjuagueTranscurrido;preenjuagueDisponible=false;
    TPreEnjuagueTranscurrido=(preenjuagueDisponible==false && filaLavado<LIM_FILA && filaPreEnjuage!=0)?TPreEnjuagueTranscurrido+1:TPreEnjuagueTranscurrido;
    if(DeltaTPreEnjuague==0){
        if(filaLavado<LIM_FILA  && filaPreEnjuage!=0){
            filaLavado++;preenjuagueDisponible=true;filaPreEnjuage--;
        }
    }

    if(lavadoDisponible==true){//LAVADO
        TLavado=generadorLavado(); TLavadoTranscurrido=0;
    }
    let DeltaTLavado=TLavado-TLavadoTranscurrido;lavadoDisponible=false;
    TLavadoTranscurrido=(lavadoDisponible==false && filaSecado<LIM_FILA && filaLavado!=0)?TLavadoTranscurrido+1:TLavadoTranscurrido;
    if(DeltaTLavado==0){
        if(filaSecado<LIM_FILA && filaLavado!=0){
            filaSecado++;lavadoDisponible=true;filaLavado--;
        }
    }
    if(secado1Disponible==true){//SECADO 1
        TSecado1=generadorSecado();TSecado1Transcurrido=0;
    }
    let DeltaTSecado1=TSecado1-TSecado1Transcurrido; secado1Disponible=false;
    comprobacion_secado_empezado=!(filaSecado==1 && secado_empezado==true);
    TSecado1Transcurrido=(secado1Disponible==false && filaSecado!=0 && comprobacion_secado_empezado)?TSecado1Transcurrido+1:TSecado1Transcurrido;
    if(DeltaTSecado1==0){
        if(filaSecado!=0){
            secado1Disponible=true;AutosTotalesAtendidos++;
            filaSecado--;
        }
    }
    if(secado2Disponible==true){ //SECADO 2
        TSecado2=generadorSecado();TSecado2Transcurrido=0;
    }
    let DeltaTSecado2=TSecado2-TSecado2Transcurrido; secado2Disponible=false;
    secado_empezado=(secado2Disponible==false && filaSecado>1)?true:secado_empezado;
    TSecado2Transcurrido=(secado2Disponible==false && filaSecado!=0 && secado_empezado)?TSecado2Transcurrido+1:TSecado2Transcurrido;
    if(DeltaTSecado2==0){
        if(filaSecado!=0){
            secado2Disponible=true; AutosTotalesAtendidos++;
            filaSecado--; secado_empezado=false;
        }
    }

    //CONSOLES:LOG
    document.getElementById("TLlegada").innerHTML="Llegada: "+TLlegada+" seg";
    document.getElementById("Siguete_Llegada").innerHTML="Siguente Llegada en: "+DeltaTLlegada+" seg";
    document.getElementById("Llegada_transcurrido").innerHTML="Tiempo Transcurrido: "+TLlegadaTranscurrido+" seg";


    document.getElementById("TCaja").innerHTML="Caja: "+TCobro+" seg";
    document.getElementById("Siguiente_Caja").innerHTML="Siguente Caja en: "+ DeltaTCobro+" seg";
    document.getElementById("Cobro_transcurrido").innerHTML="Tiempo Transcurrido: "+TCobroTranscurrido+" seg";
    document.getElementById("value_fila_caja").innerHTML="Fila: "+filaCobro+" autos";

    document.getElementById("Pre-Enjuague").innerHTML="Pre Enjuague: "+TPreEnjuague+" seg";
    document.getElementById("Siguiente_pre_enjuague").innerHTML="Siguente Pre-Enjuague en: "+DeltaTPreEnjuague+" seg";
    document.getElementById("Pre_Enjuague_transcurrido").innerHTML="Tiempo Transcurrido: "+TPreEnjuagueTranscurrido+" seg";
    document.getElementById("value_fila_pre_enjuague").innerHTML="Fila: "+filaPreEnjuage+" autos";

    document.getElementById("TLavado").innerHTML="Lavado: "+TLavado+" seg";
    document.getElementById("Siguiente_Lavado").innerHTML="Siguente Lavado en: "+DeltaTLavado+" seg";
    document.getElementById("Lavado_transcurrido").innerHTML="Tiempo Transcurrido: "+TLavadoTranscurrido+" seg";
    document.getElementById("value_fila_lavado").innerHTML="Fila: "+filaLavado+" autos";
    
    document.getElementById("TSecado1").innerHTML="Secado 1: "+TSecado1+" seg";
    document.getElementById("Siguiente_Secado1").innerHTML="Siguente Lavado en: "+DeltaTSecado1+" seg";
    document.getElementById("Secado1_transcurrido").innerHTML="Tiempo Transcurrido: "+TSecado1Transcurrido+" seg";
    document.getElementById("value_fila_secado1").innerHTML="Fila: "+filaSecado+" autos";

    document.getElementById("TSecado2").innerHTML="Secado 2: "+TSecado2+" seg";
    document.getElementById("Siguiente_Secado2").innerHTML="Siguente Lavado en: "+DeltaTSecado2+" seg";
    document.getElementById("Secado2_transcurrido").innerHTML="Tiempo Transcurrido: "+TSecado2Transcurrido+" seg";
    document.getElementById("value_fila_secado2").innerHTML="Fila: "+filaSecado+" autos";
    //console.log();
    //break;
    document.getElementById("Tiempo_Transcurrido").innerHTML="Tiempo Transcurrido: "+(tiempo + 1)+" seg";
    document.getElementById("Autos_totales").innerHTML="Autos Totales Atendidos: "+AutosTotalesAtendidos;
    document.getElementById("velocidad").innerHTML="Velocidad: x"+vel;

    //Enlistamos los autos
    let lista = document.getElementById("lista");
    lista.innerHTML = autos.map(autos => `<li>${autos}</li>`).join('');
    
    tiempo++;
}


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