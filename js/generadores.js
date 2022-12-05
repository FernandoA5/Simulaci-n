function generadorLlegada(){
    return generador(8, 3.3)*60;
}
function generadorCobro(){
    return generador(2.13, 0.83)*60;
}
function generadorPreEnjuague(){
    return generador(3.25, 0.71)*60;
}
function generadorLavado(){
    return generador(3.13, 0.99)*60;
}
function generadorSecado(){
    return generador(8.38, 1.92)*60;
}

function generador(media, desv_est){
    let sumR=0; let normal=0;
    for(x=0; x<12; x++){
        let R=Math.random();
        sumR+=R;
    }
    normal=media+ (desv_est*(sumR-6))+1;
    return Math.floor(normal);
}