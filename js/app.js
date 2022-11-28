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
        TLlegadaTranscurrido=0;
    }
    let DeltaTLlegada = TLlegada-TLlegadaTranscurrido;llegadaDisponible=false;
    if(DeltaTLlegada==0){
        if(filaCobro < LIM_FILA){
            filaCobro++;llegadaDisponible=true; //AQUÍ, SE ESTA VOLVIENDO NEGATIVO EL TLlegada
            //POSIBLEMENTE ES PORQUE EN ALGUN MOMENTO LA FILA LLEGA AL MÁXIMO
            //ENTONCES LA LLEGADA NO SE VUELVE DISPONIBLE
            //ENTONCES NO SE REINÍCIA a 0
        }
        if(filaCobro==LIM_FILA){ //SI LA FILA ESTÁ LLENA
            llegadaDisponible=true
        }
    }
    TLlegadaTranscurrido=(llegadaDisponible==false && filaCobro<LIM_FILA)?TLlegadaTranscurrido+1:TLlegadaTranscurrido;

    if(cobroDisponible==true && filaCobro!=0){ //COBRO
        TCobro=generadorCobro();
        TCobroTranscurrido=0;
    }
    let DeltaTCobro= TCobro-TCobroTranscurrido;cobroDisponible=false;
    if(DeltaTCobro==0){
        if(filaPreEnjuage<LIM_FILA){
            filaPreEnjuage++;cobroDisponible=true;
        }
        // if(filaCobro==LIM_FILA){TCobroTranscurrido=TCobro;}
        filaCobro=(filaCobro==0)?filaCobro:filaCobro-1;
    }
    TCobroTranscurrido=(cobroDisponible==false && filaPreEnjuage<LIM_FILA)?TCobroTranscurrido+1:TCobroTranscurrido; //QUIZÁ
    //EL ERROR ESTÉ AQUÍ, DE NADA SIRVE CAMBIAR EL VALOR DE TTranscurrido, si luego se sobre escribirá aquí

    if(preenjuagueDisponible==true && filaPreEnjuage!=0){//PREENGUAJE
        TPreEnjuague=generadorPreEnjuague(); 
        TPreEnjuagueTranscurrido=0;
    } 
    let DeltaTPreEnjuague= TPreEnjuague-TPreEnjuagueTranscurrido;preenjuagueDisponible=false;
    if(DeltaTPreEnjuague==0){
        if(filaLavado<LIM_FILA){
            filaLavado++;preenjuagueDisponible=true;
        }
        // if(filaLavado==LIM_FILA){ TPreEnjuagueTranscurrido=TPreEnjuague; }
        filaPreEnjuage=(filaPreEnjuage==0)?filaPreEnjuage:filaPreEnjuage-1;
    }
    TPreEnjuagueTranscurrido=(preenjuagueDisponible==false && filaLavado<LIM_FILA)?TPreEnjuagueTranscurrido+1:TPreEnjuagueTranscurrido;

    if(lavadoDisponible==true && filaLavado!=0){//LAVADO
        TLavado=generadorLavado();
        TLavadoTranscurrido=0;
    }
    let DeltaTLavado=TLavado-TLavadoTranscurrido;lavadoDisponible=false;
    if(DeltaTLavado==0){
        if(filaSecado<LIM_FILA){
            filaSecado++;secadoDisponible=true;
        }
        if(filaSecado==LIM_FILA){TLavadoTranscurrido=TLavado;}
        filaLavado=(filaLavado==0)?filaLavado:filaLavado-1;
    }
    TLavadoTranscurrido=(lavadoDisponible==false)?TLavadoTranscurrido+1:TLavadoTranscurrido;
    if(secado1Disponible==true && filaSecado!=0){//SECADO
        TSecado1=generadorSecado();
        TSecado1Transcurrido=0;
    }
    let DeltaTSecado1=TSecado1-TSecado1Transcurrido; secado1Disponible=false;

    if(DeltaTSecado1==0){
        secado1Disponible=true;
        filaSecado=(filaSecado==0)?filaSecado:filaSecado-1;
    }
    TSecado1Transcurrido++;
    if(secado2Disponible==true && filaSecado!=0){
        TSecado2=generadorSecado();
        TSecado2Transcurrido=0;
    }
    let DeltaTSecado2=TSecado2-TSecado2Transcurrido; secado2Disponible=false;
    if(DeltaTSecado2==0){
        secado2Disponible=true;
        filaSecado=(filaSecado==0)?filaSecado:filaSecado-1;
    }
    TSecado2Transcurrido++;

    //CONSOLES:LOG
    
    document.getElementById("Siguete_Llegada").innerHTML="Siguente Llegada en: "+DeltaTLlegada+" seg";
    document.getElementById("Llegada_lavado").innerHTML="Llegada: "+TLlegada+" seg";
    document.getElementById("Llegada_transcurrido").innerHTML="Tiempo Transcurrido: "+TLlegadaTranscurrido+" seg";

    document.getElementById("Siguiente_Caja").innerHTML="Siguente Caja en: "+ DeltaTCobro+" seg";
    document.getElementById("value_fila_caja").innerHTML="Fila en la caja: "+filaCobro+" seg";

    document.getElementById("Siguiente_pre_enjuague").innerHTML="Siguente Pre-Enjuague en: "+DeltaTPreEnjuague+" seg";
    document.getElementById("value_fila_pre_enjuague").innerHTML="Fila en pre_enjuague: "+filaPreEnjuage+" seg";
    
    
    //console.log();
    //break;
    document.getElementById("Tiempo_Transcurrido").innerHTML="Tiempo Transcurrido: "+tiempo;


    tiempo++;
}