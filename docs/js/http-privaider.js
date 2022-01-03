
const urlApi = 'https://rickandmortyapi.com/api/character';

export const obtenerInformacion = async( pagina ) =>{

    try{
        
const respuesta = await fetch( `${urlApi}/?page=${pagina}` );

if( respuesta.ok ){
    
const { info, results } = await respuesta.json();


return { info, results };

}

else throw 'No se pudo realizar la peticion';


}catch(err){

    throw err;

}
}


