function Init(){
    let consultando = false;

    function reemplazarVocalesConTilde(texto) {
        const conTilde = ['á', 'é', 'í', 'ó', 'ú'];
        const sinTilde = ['a', 'e', 'i', 'o', 'u'];
    
        return texto.split('').map(letra => {
            const index = conTilde.indexOf(letra);
            return index !== -1 ? sinTilde[index] : letra;
        }).join('');
    }

    async function ConsultarBoletas(){
        try {
            if(consultando) return;
            consultando = true;
            let peticion = await fetch('numeros-vendidos.json?v='+Date.now());
            const datosBoletas = await peticion.json();

            const boletasPagadas = datosBoletas.filter(boleta => boleta.pagado == true);
            const boletasSinPagar = datosBoletas.filter(boleta => boleta.pagado == false);

            spanTodos.innerText = `Total: ${datosBoletas.length}`;
            spanPagadas.innerText = `Pagadas: ${boletasPagadas.length}`;
            spanSinPagar.innerText = `Sin pagar: ${boletasSinPagar.length}`;


            let html = `
            <span class="titulo">#</span>
            <span class="titulo">Nombre</span>
            <span class="titulo">N. Celular</span>
            <span class="titulo">Pago</span>
            `;

            const valorFiltroVendidas = filtroVendidas.value;

            let boletasAux = datosBoletas;
            const nombreABuscar = reemplazarVocalesConTilde(inputNombre.value.trim(' ').toLowerCase());

            if(nombreABuscar!=''){
                boletasAux = datosBoletas.filter(boleta => reemplazarVocalesConTilde(boleta.nombre.toLowerCase()).includes(nombreABuscar));
            }

            if(valorFiltroVendidas=='1'){
                boletasAux = boletasAux.filter(boleta => boleta.pagado == true);
            }else if(valorFiltroVendidas=='2'){
                boletasAux = boletasAux.filter(boleta => boleta.pagado == false);
            }
            
            for(const boleta of boletasAux){
                let numero2Cifras = boleta.numero.toString().length==1 ? '0'+boleta.numero : boleta.numero.toString();
                html+=`
                <span class="numero-boleta">${numero2Cifras}</span>
                <span>${boleta.nombre}</span>
                <span>${boleta.celular}</span>
                <span class="pagado-boleta${boleta.pagado ? ' pagado' : ''}">${boleta.pagado ? 'Pagado' : 'Sin pagar'}</span>
                `;
            }
            tablaBoletas.innerHTML = html;
            consultando = false;
        } catch (error) {
            console.log(error);
            consultando = false;
        }
    }
    ConsultarBoletas();
    setInterval(ConsultarBoletas,1000);
}
Init();