let uri="https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=f1a222a0f7324be494ff2a7de284fc11";
let dato3="client_secret=6aea822083c6414f8f21589ec577021d";

let parametrosPeticion={
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body:dato1+"&"+dato2+"&"+dato3
    
}

fetch (uri,parametrosPeticion)
.then (function(respuesta){
    return(respuesta.json());
})

.then(function(respuesta){
    console.log(respuesta);
    obtenerToken(respuesta);

})

.catch(function(error){
    console.log(error);
})

function obtenerToken(datos){
    let token=datos.token_type+" "+datos.access_token;
    console.log(token);
    pedirCanciones(token);
}

function pedirCanciones(token){

    let uri="https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m/top-tracks?market=US";

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
    
    })   

    .catch(function(error){
        console.log(error);
    })

}

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
        titulo.classList.add("text-center")
        titulo.classList.add("mt-10")
        titulo.textContent=cancion.name;

        let popularidad=document.createElement("h6");
        popularidad.classList.add("progress-bar","progress-bar-striped", "progress-bar-animated")
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

