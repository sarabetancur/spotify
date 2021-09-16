let uri="https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m/top-tracks?market=US";

let token="Bearer BQAaYrJYNoC5oSVCe0w7vS2nFDkiIAG7_mpJ0iMcojNOc_ygz8HCq_PMQSbf-BdXW3_y1kVwF0bKSYwjB62WR5Zsm9ZfDGiR5T1dFP9M5K0kPTBmYdLrE-xe8Rj_ITb5tRTVm5gXXtvBbB5_RsMHOwSoHrdfEhUYyfE";

let parametrosPeticion={
    method:"GET",
    headers:{
        Authorization:token
    }
}

fetch(uri,parametrosPeticion)
.then(function(respuesta){
    return(respuesta.json());
})

.then(function(respuesta){

    console.log(respuesta);
    pintarDatos(respuesta.tracks);

    /*console.log(respuesta);//objeto
    console.log(respuesta.tracks);//arreglo
    console.log(respuesta.tracks[0]);
    console.log(respuesta.tracks[0].name);
    console.log(respuesta.tracks[0].preview_url);
    console.log(respuesta.tracks[0].album.images[0].url);*/
})   

.catch(function(error){
    console.log(error);
})

function pintarDatos(datos){

    let fila=document.getElementById("fila");
    datos.forEach(function(cancion){

        let columna=document.createElement("div");
        columna.classList.add("col");

        let tarjeta=document.createElement("div");
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");
        
        let imagen=document.createElement("img");
        imagen.classList.add("card-img-top");
        imagen.src=cancion.album.images[0].url;

        let titulo=document.createElement("h6");
        titulo.classList.add("align-middle")
        titulo.textContent=cancion.name;

        let popularidad=document.createElement("h6");
        popularidad.textContent=cancion.popularity;

        let audio=document.createElement("audio");
        audio.classList.add("w-100");
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url;


       

        //PADRES E HIJOS
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(audio);
        tarjeta.appendChild(popularidad);
        columna.appendChild(tarjeta);
        fila.appendChild(columna);


        



    })
}
