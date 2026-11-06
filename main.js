let characters=[];
let trilogia = "";

Original.addEventListener("click",()=>{
  trilogia="original";
  loadTrilogy(trilogia)
  cargar();
});
Precuelas.addEventListener("click",()=>{
  trilogia="precuelas";
  loadTrilogy(trilogia)
  cargar();
});
Todas.addEventListener("click",()=>{
  trilogia="";
  loadTrilogy(trilogia)
  cargar();
})

let arriba = document.getElementById('Header')

function loadTrilogy(trilogy){
  if (trilogy===""){
    arriba.innerHTML=`
    <header class="header" id="Header">
        <img class ="portada" src="Recursos/Foto de Portada.jfif" alt="Imagen-de-portada">
    <h1 class="Title">Wookipedia ORT</h1>
    </header>
    `
  }
  else if (trilogy==="original"){
    arriba.innerHTML=`
    <header class="header" id="Header">
        <img class ="portada" src="Recursos/PortadaTrilogiaOriginal.png" alt="Imagen-de-portada">
    <h1 class="Title">Wookipedia ORT (IV V VI)</h1>
    </header>
    `
  }
  else{
    arriba.innerHTML=`
    <header class="header" id="Header">
        <img class ="portada" src="Recursos/PortadaPrecuelas.jfif" alt="Imagen-de-portada">
    <h1 class="Title">Wookipedia ORT (I II III)</h1>
    </header>
    `
  }
}

async function cargarPersonajes(){
let i = 1;
while (i<10){

await fetch('https://swapi.dev/api/people/?page='+String(i)) 
  .then(response => response.json()) 
  .then(data => {   
    console.log('API funcionando:');
    let datos=data.results
    for (let n = 0; n<datos.length; n++){
      characters.push(datos[n]);
    }
  })
  .catch(error => {               
    console.error('No se pudo traer la API. Error:', error);
  });
  i++;

}
return characters
}

async function mostrarPersonajes(lista){

  let charactersContainer = document.getElementById('Personajes');
    
  charactersContainer.innerHTML=""

    for (const personaje of lista){
    let primeraAparicion = personaje.films[0]
    let ultumaAparicion = personaje.films[personaje.films.length-1]

    let prifetch = await fetch(primeraAparicion);
    let prires = await prifetch.json();

    let ultfetch = await fetch(ultumaAparicion)
    let ultres = await ultfetch.json()

    let cantidad =personaje.films.length;

    if (ultres.title===prires.title){
      charactersContainer.innerHTML +=`
        <article class="character-chart">
        <h2 class="nombre">${personaje.name}</h2>
        <p class="altura">${personaje.height}</p>
        <p class="altura">Única aparición:</p>
        <p class="altura">${ultres.title}</p>
        <p class="altura">Cantidad de apariciones</p>
        <p class="altura">${cantidad}</p>
        </article>
        `
    }
    else{
      charactersContainer.innerHTML +=`
        <article class="character-chart">
        <h2 class="nombre">${personaje.name}</h2>
        <p class="altura">${personaje.height}</p>
        <p class="altura">Primera aparición:</p>
        <p class="altura">${prires.title}</p>
        <p class="altura">Última aparición:</p>
        <p class="altura">${ultres.title}</p>
        <p class="altura">Cantidad de apariciones</p>
        <p class="altura">${cantidad}</p>
        </article>
        `
    }
    }
    /*lista.forEach(personaje => {
        charactersContainer.innerHTML += `
        <article class="character-chart">
        <h2 class="nombre">${personaje.name}</h2>
        <p class="altura">${personaje.height}</p>
        <p class="altura">Primera aparición:</p>
        <p class="altura">Ninguna</p>
        <p class="altura">Última aparición:</p>
        <p class="altura">Si la otra es ninguna que te crees</p>
        </article>
        `
    });*/
}



    let planets= []


  async function cargarPlanetas (){
    let i = 1;
    while (i<7){
      await fetch ("https://swapi.dev/api/planets/?page="+String(i))
      .then(response => response.json()) 
  .then(data => {   
    console.log('API funcionando:');
    let datos=data.results
    for (let n = 0; n<datos.length; n++){
      planets.push(datos[n]);
    }
  })
  .catch(error => {               
    console.error('No se pudo traer la API. Error:', error);
  });
  i++;
    }
    return planets
}

  async function mostrarPlanetas(lista){
    let planetsContainer = document.getElementById('Planetas');
    
  planetsContainer.innerHTML="";

  for (const planeta of lista){

    if (planeta.films.length===1){
      let primeraAparicion = planeta.films[0];

    let prifetch = await fetch(primeraAparicion);

    let prires = await prifetch.json();

      planetsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${planeta.name}</h2>
      <p class="altura">Única aparición</p>
      <p class="altura">${prires.title}</p>
      </article>
      `
    }
    else if (planeta.films.length===0){
      planetsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${planeta.name}</h2>
      <p class="altura">El planeta no a aparecido</p>
      <p class="altura">en ninguna de las películas</p>
      </article>
      `
    }
    else{
      let primeraAparicion = planeta.films[0];
    let ultimaAparicion = planeta.films[planeta.films.length-1];

    let prifetch = await fetch(primeraAparicion);
    let ultfetch = await fetch(ultimaAparicion);

    let prires = await prifetch.json();
    let ultres = await ultfetch.json();
  
    let cantidad = planeta.films.length;

      planetsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${planeta.name}</h2>
      <p class="altura">Primera aparición</p>
      <p class="altura">${prires.title}</p>
      <p class="altura">Ultima aparición</p>
      <p class="altura">${ultres.title}</p>
      <p class="altura">Cantidad de apariciones</p>
      <p class="altura">${cantidad}</p>
      </article>
      `
    }
  }
}
async function mostrarPersonajesTrilogia(lista){

  let charactersContainer = document.getElementById('Personajes');
  charactersContainer.innerHTML="";
  let cantidad= 0;
  let z = 0;


  if (trilogia==="original"){
    for (const personaje of lista){
        let yaMarcado = false;
      z++;
      let apariciones = [];
      for (let n = 0; n<personaje.films.length;n++){
        let aparicion = await fetch (personaje.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length
      let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        console.log("Vuelta: "+z);
        console.log("Numeración: " + m)
        console.log("Marcado?: " + yaMarcado);
        console.log("Aparición: " + apariciones[m]);
        if ((apariciones[m]==="A New Hope" || apariciones[m]==="The Empire Strikes Back" || apariciones[m]==="Return of the Jedi")&&yaMarcado===false){
          charactersContainer.innerHTML+=`
            <article class="character-chart">
            <h2 class="nombre">${personaje.name}</h2>
            <p class="altura">Primera aparición</p>
            <p class="altura">${prires}</p>
            <p class="altura">Ultima aparición</p>
            <p class="altura">${ultres}</p>
            <p class="altura">Cantidad de apariciones</p>
            <p class="altura">${cantidad}</p>
            </article>
          `
          yaMarcado=true;
        }
      }
    }
  }
  else{
    for (const personaje of lista){
        let yaMarcado = false;
      let apariciones = [];
      for (let n = 0; n<personaje.films.length;n++){
        let aparicion = await fetch (personaje.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length
        let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        if ((apariciones[m]==="The Phantom Menace" || apariciones[m]==="Attack of the Clones" || apariciones[m]==="Revenge of the Sith")&&yaMarcado===false){
          charactersContainer.innerHTML+=`
            <article class="character-chart">
            <h2 class="nombre">${personaje.name}</h2>
            <p class="altura">Primera aparición</p>
            <p class="altura">${prires}</p>
            <p class="altura">Ultima aparición</p>
            <p class="altura">${ultres}</p>
            <p class="altura">Cantidad de apariciones</p>
            <p class="altura">${cantidad}</p>
            </article>
          `
          yaMarcado=true;
        }
      }
    }
  }
}
async function mostrarPlanetasTrilogia(lista){
 
  let planetsContainer = document.getElementById('Planetas');
  planetsContainer.innerHTML="";
  let cantidad = 0;

  if (trilogia==="original"){
    for (const planetas of lista){
        let yaMarcado = false;
      let apariciones = [];
      for (let n = 0; n<planetas.films.length;n++){
        let aparicion = await fetch (planetas.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length
        let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        if ((apariciones[m]==="A New Hope" || apariciones[m]==="The Empire Strikes Back" || apariciones[m]==="Return of the Jedi")&&yaMarcado===false){
          planetsContainer.innerHTML+=`
            <article class="character-chart">
            <h2 class="nombre">${planetas.name}</h2>
            <p class="altura">Primera aparición</p>
            <p class="altura">${prires}</p>
            <p class="altura">Ultima aparición</p>
            <p class="altura">${ultres}</p>
            <p class="altura">Cantidad de apariciones</p>
            <p class="altura">${cantidad}</p>
            </article>
          `
          yaMarcado=true;
        }
      }
    }
  }
  else{
    for (const planeta of lista){
      let yaMarcado = false;
      let apariciones = [];
      for (let n = 0; n<planeta.films.length;n++){
        let aparicion = await fetch (planeta.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length;
        let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        if ((apariciones[m]==="The Phantom Menace" || apariciones[m]==="Attack of the Clones" || apariciones[m]==="Revenge of the Sith")&&yaMarcado===false){
          planetsContainer.innerHTML+=`
            <article class="character-chart">
            <h2 class="nombre">${planeta.name}</h2>
            <p class="altura">Primera aparición</p>
            <p class="altura">${prires}</p>
            <p class="altura">Ultima aparición</p>
            <p class="altura">${ultres}</p>
            <p class="altura">Cantidad de apariciones</p>
            <p class="altura">${cantidad}</p>
            </article>
          `
          yaMarcado=true;
        }
      }
    }
  }
}
    async function cargar() {
    
      let Personajes = await cargarPersonajes();
      let Planetas = await cargarPlanetas();

      if (trilogia===""){
        mostrarPersonajes(Personajes);
        mostrarPlanetas(Planetas);
      }
      else{
        mostrarPersonajesTrilogia(Personajes);
        mostrarPlanetasTrilogia(Planetas);
      }
  }

  cargar();