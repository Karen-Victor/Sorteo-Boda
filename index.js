function Init(){
    let numerosElegidosPorUsuario = [];

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
        let numero = i.toString().length==1 ? '0'+i : i;
        html += `<span class="sin-vender" id="span${i}" data-spannumero="${numero}">${numero}</span>`;
    }
    tabla.innerHTML = html;

    function ValidarNumerosDisponibles(){
        if(numerosElegidosPorUsuario.length>0){
            numerosElegidosPorUsuario.sort();

            let html = ``;
            for(numero of numerosElegidosPorUsuario){
                html+=`<span class="numero-aviso">${numero}</span>`;
            }
            contenedorNumerosAviso.innerHTML = html;

            let mensaje = '';
            if(numerosElegidosPorUsuario.length>1){
                mensaje = `¡Hola!, quiero comprar los números: `;
                mensaje += numerosElegidosPorUsuario.slice(0, -1).join(", ");
                mensaje+= ` y ${numerosElegidosPorUsuario[numerosElegidosPorUsuario.length - 1]}`;
            }else{
                mensaje = `¡Hola!, quiero comprar el número: ${numerosElegidosPorUsuario[0]}`;
            }

            let url = "https://api.whatsapp.com/send?phone=573218768200";
            mensaje = encodeURIComponent(mensaje);
            url = `${url}&text=${mensaje}`;
            enlaceComprar.href = url;

            contenedorMensaje.classList.add('on');
        }else{
            contenedorMensaje.classList.remove('on');
        }
    }

    document.getElementById('tabla').addEventListener('click',e=>{
        const target = e.target;
        if(target.hasAttribute('data-spannumero') && target.classList.contains('sin-vender')){
            const valor = target.getAttribute('data-spannumero').toString();
            if(!numerosElegidosPorUsuario.includes(valor)) {
                numerosElegidosPorUsuario.push(valor);
            }else{
                numerosElegidosPorUsuario = numerosElegidosPorUsuario.filter(numero => numero !== valor);
            }
            ValidarNumerosDisponibles();
        } 
    })

    let consultando = false;

    async function ConsultarNumeros(){
        try {
            if(consultando) return;
            consultando = true;
            let peticion = await fetch('numeros-vendidos.json?v='+Date.now());
            const datosBoletas = await peticion.json();

            let numerosPorVender = 100-datosBoletas.length;
            if(numerosPorVender<0) numerosPorVender = 0;
            if(numerosPorVender==0){
                numerosSobrantes.innerText = `¡Ya se vendieron todos los números!`;
            }else if(numerosPorVender==1){
                numerosSobrantes.innerText = `¡Apurate! Queda sólo 1 número disponible para comprar`;
            }else if(numerosPorVender<=5){
                numerosSobrantes.innerText = `¡Rápido! Quedan los últimos ${numerosPorVender} números disponibles para comprar`;
            }else if(numerosPorVender<=10){
                numerosSobrantes.innerText = `¡Ya casi se acaban! Quedan los últimos ${numerosPorVender} números disponibles para comprar`;
            }else if(numerosPorVender<=25){
                numerosSobrantes.innerText = `¡Se están agotando! Quedan solo ${numerosPorVender} números disponibles para comprar`;
            }else if(numerosPorVender<=50){
                numerosSobrantes.innerText = `¡Escoge tu número! Quedan solo ${numerosPorVender} números disponibles para comprar`;
            }else{
                numerosSobrantes.innerText = `¡Escoge el número que quieras! Quedan ${numerosPorVender} números disponibles para comprar`;
            }

            for(const boleta of datosBoletas){
                let cambios =  false;
                let numero2Cifras = boleta.numero.toString().length==1 ? '0'+boleta.numero : boleta.numero.toString();
                if(numerosElegidosPorUsuario.includes(numero2Cifras)){
                    cambios = true;
                    numerosElegidosPorUsuario = numerosElegidosPorUsuario.filter(valor => valor !== numero2Cifras);
                }
                if(cambios) ValidarNumerosDisponibles();
                document.getElementById(`span${boleta.numero}`).classList.remove('sin-vender');
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