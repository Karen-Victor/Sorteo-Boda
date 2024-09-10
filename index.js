function Init(){
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