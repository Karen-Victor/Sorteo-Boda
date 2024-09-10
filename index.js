function Init(){
    function calcularTiempoRestante() {
        const ahora = new Date();
        const fechaObjetivo = new Date('2024-10-12T00:00:00');
        const diferencia = fechaObjetivo - ahora;
        if(diferencia>0){
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
            spanTemporizador.innerText = `Faltan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos!`;
        }else {
            spanTemporizador.innerText = `Hoy juega el sorteo con los últimos 2 números de la lotería Boyacá!`;
        }
        
    }
    
    calcularTiempoRestante();
    setInterval(calcularTiempoRestante,1000);

    let html = ``;
    for(let i=0; i<100; i++){
        html += `<span class="sin-vender" id="span${i}">${i}</span>`;
    }
    tabla.innerHTML = html;

    let consultando = false;

    async function ConsultarNumeros(){
        try {
            if(consultando) return;
            consultando = true;
            let peticion = await fetch('numeros-vendidos.json?v='+Date.now());
            const numerosVendidos = await peticion.json();
            for(numero of numerosVendidos){
                document.getElementById(`span${numero}`).classList.remove('sin-vender');
            }
            consultando = false;
        } catch (error) {
            consultando = false;
        }
    }
    ConsultarNumeros();
    setInterval(ConsultarNumeros,1000);
}
Init();