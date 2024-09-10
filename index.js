function Init(){
    let consultando = false;
    setInterval(async ()=>{
        try {
            if(consultando) return;
            consultando = true;
            // const peticion = await fetch('https://github.com/Karen-Victor/Sorteo-Boda/blob/main/numeros-vendidos.json');
            // const numerosVendidos = await peticion.json();
            // console.log(numerosVendidos);

            const numerosVendidos = [0,1,4,6,7,8,9,10,14,16,21,22,23,26,27,29,30,36,38,43,57,62,75,78,82,83,87,96,98]
            let html = ``;
            for(let i=0; i<100; i++){
                const clase = numerosVendidos.includes(i) ? ' class="vendido"' : '';
                html += `<span ${clase}>${i}</span>`;
            }
            tabla.innerHTML = html;
        } catch (error) {
            consultando = false;
        }
       
    },1000);
    
}
Init();