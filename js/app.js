const TIEMPO_MAXIMO = 1000;
const LIM_FILA=4;
let tiempo=0;
let TLlegada=0;
let TCobro=0;
let TPreEnjuague=0;
let TSecado=0;

let TLlegadaTranscurrido=0;
let TCobroTranscurrido=0;
let TPreEnjuagueTranscurrido=0;
let TLavadoTranscurrido=0;
let TSecadoTranscurrido=0;

let llegadaDisponible=true;
let cobroDisponible=true;
let lavadoDisponible=true;
let preenjuagueDisponible=true;
let secadoDisponible=true;

let filaCobro=0;
let filaPreEnjuage=0;
let filaLavado=0;
let filaSecado=0;

let lastUpdate = Date.now();
let myInterval = setInterval(tick, 0);
let dt = 0;
let contador=0;

function tick() {
    let now = Date.now();
    dt = now - lastUpdate;
    if(dt>=1000){
        lastUpdate=now;
        simulacion()
        contador++;
    }
}
function simulacion()
{
    if (llegadaDisponible==true)  { //LLEGADA
        TLlegada=generadorLlegada();
    }
    let DeltaTLlegada = TLlegada-TLlegadaTranscurrido;llegadaDisponible=false;
    if(DeltaTLlegada==0){
        if(filaCobro < LIM_FILA){
            filaCobro++;llegadaDisponible=true;
        }
    }
    TLlegadaTranscurrido++;
    if(cobroDisponible==true){ //COBRO
        TCobro=generadorCobro();
    }
    let DeltaTCobro= TCobro-TCobroTranscurrido;cobroDisponible=false;
    if(DeltaTCobro==0){
        if(filaPreEnjuage<LIM_FILA){
            filaPreEnjuage++;cobroDisponible=true;
        }
    }
    TCobroTranscurrido++;
    if(preenjuagueDisponible==true){//PREENGUAJE
        TPreEnjuague=generadorPreEnjuague(); 
    } 
    let DeltaTPreEnjuague= TPreEnjuague-TPreEnjuagueTranscurrido;preenjuagueDisponible=false;
    if(DeltaTPreEnjuague==0){
        if(filaLavado<LIM_FILA){
            filaLavado++;lavadoDisponible=true;
        }
    }
    

    //CONSOLES:LOG
    console.log(filaCobro);
    console.log();
    //break;
    tiempo++;
}