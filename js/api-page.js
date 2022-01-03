import { obtenerInformacion } from './index.js';

const contenedorTarjetas = document.querySelector('#contenedor'),
      btnEvent           = document.querySelector('#btn-pagination');
    

export const crearApiHtml =( { name,status,origin,location,image })=>{

const html= `<div class="col">
<div class="card">
  <img src="${ image }" class="card-img-top" alt="imagen">
  <div class="card-body">
    <h5 class="card-title">${ name }</h5>
    <i class="fas fa-circle fa-xs"></i>
    <span>${status}</span>
  <div class="info">
      <span class="text-color fw-bold">Origen:</span>
      <span>${origin.name}</span>
  </div>
  <div class="info">
      <span class="text-color fw-bold">Ultima vez visto:</span>
      <span>${location.name}</span>
  </div>
  </div>
</div>
</div>
`;

contenedorTarjetas.innerHTML += html;

}


export const init= async()=>{

const personajes = await obtenerInformacion();

let contador = 1;

btnEvent.addEventListener('click',async ( event )=>{

    if(event.target.innerText === 'Siguiente'){

      event.target.blur();//Quitamos el foco del elemento boton.

      while(contenedorTarjetas.firstChild){

        removerNodos();
      
  }
     const nuevaPagina =await obtenerInformacion(contador = contador+1)

       nuevaPagina.results.forEach(crearApiHtml);
  
       estatusDeVida();

    }else if(event.target.innerText === 'Atras'){
  
      event.target.blur();//Quitamos el foco del elemento boton.
  
      while(contenedorTarjetas.firstChild){

        removerNodos();
         
      }
         const nuevaPagina =await obtenerInformacion(contador = contador-1)

           nuevaPagina.results.forEach(crearApiHtml);
  
           estatusDeVida();


    }


})

personajes.results.forEach( crearApiHtml );

estatusDeVida();

}


const estatusDeVida =()=>{

    const coleccionesDiv = contenedorTarjetas.children;

  for(let live of coleccionesDiv ){

    const vidaStatus  = live.children[0].children[1].children[2],
          iconoDeVida = live.children[0].children[1].children[1];

      if( vidaStatus.innerText === 'Alive'){

       iconoDeVida.classList.add('green');
      
      }else if(vidaStatus.innerText === 'Dead'){

        iconoDeVida.classList.add('red');
      }
    }
}


const removerNodos=()=>{

  contenedorTarjetas.removeChild(contenedorTarjetas.firstChild);

}