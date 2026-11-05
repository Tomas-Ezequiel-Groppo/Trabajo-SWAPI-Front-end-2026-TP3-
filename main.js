let characters=[];
let trilogia = "";

Original.addEventListener("click",()=>{
  trilogia="original";
});
Precuelas.addEventListener("click",()=>{
  trilogia="precuelas";
});
Todas.addEventListener("click",()=>{
  trilogia="";
})

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
    let ultimaAparicion = planeta.films[planeta.films.length-1];

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
  if (trilogia==="original"){

  }
  else{

  }
}
async function mostrarPlanetasTrilogia(lista){

}
    async function cargar() {
    
      let Personajes = await cargarPersonajes();
      let Planetas = await cargarPlanetas();

      if (trilogia===""){

      }
      else{
        mostrarPersonajes(Personajes);
        mostrarPlanetas(Planetas);
        console.log(Planetas)
      }
  }

  cargar();