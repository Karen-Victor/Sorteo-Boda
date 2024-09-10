function Init(){
    let consultando = false;
    setInterval(async ()=>{
        try {
            if(consultando) return;
            consultando = true;
            const peticion = await fetch('https://github.com/Karen-Victor/Sorteo-Boda/blob/main/numeros-vendidos.json?v=3');
            const numerosVendidos = await peticion.json();
            let html = ``;
            for(let i=0; i<100; i++){
                const clase = numerosVendidos.includes(i) ? ' class="sin-vender"' : '';
                html += `<span ${clase}>${i}</span>`;
            }
            tabla.innerHTML = html;
        } catch (error) {
            consultando = false;
        }
    },1000);
}
Init();