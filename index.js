function Init(){
    let consultando = false;
    setInterval(async ()=>{
        try {
            const peticion = await fetch('numeros-vendidos.json');
            if(consultando) return;
            consultando = true;
            const numerosVendidos = [0,1,4,6,7,8,9,10,14,16,21,22,23,26,27,29,30,36,38,43,57,62,75,78,82,83,87,96,98]
            let html = ``;
            for(let i=0; i<100; i++){
                const clase = numerosVendidos.includes(i) ? 'vendida' : 'sin-vender';
                html += `<span class="clase">${i}</span>`;
            }
            tabla.innerHTML = html;
        } catch (error) {
            consultando = false;
        }
       
    },2000);
    
}
Init();