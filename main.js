let trilogia = "";
let Categoria = document.getElementById('Categoria');
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
let characters = [];
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





// https://swapi.dev/api/starships/9/

  async function cargarPlanetas (){
        let planets= []
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

async function cargarNaves (){
  let starships = [];
  for (let i = 1; i<5;i++){
    await fetch ("https://swapi.dev/api/starships/?page="+String(i))
    .then(response => response.json()) 
.then(data => {   
  console.log('API funcionando:');
  let datos=data.results
  for (let n = 0; n<datos.length; n++){
    starships.push(datos[n]);
  }
})
.catch(error => {               
  console.error('No se pudo traer la API. Error:', error);
});
}
return starships;
}
async function mostrarNaves(lista){
  let starshipsContainer = document.getElementById('Naves');
    
  starshipsContainer.innerHTML="";

  for (const nave of lista){

    if (nave.films.length===1){
      let primeraAparicion = nave.films[0];

    let prifetch = await fetch(primeraAparicion);

    let prires = await prifetch.json();

      starshipsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${nave.name}</h2>
      <p class="altura">Única aparición</p>
      <p class="altura">${prires.title}</p>
      </article>
      `
    }
    else if (nave.films.length===0){
      starshipsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${nave.name}</h2>
      <p class="altura">El planeta no a aparecido</p>
      <p class="altura">en ninguna de las películas</p>
      </article>
      `
    }
    else{
      let primeraAparicion = nave.films[0];
    let ultimaAparicion = nave.films[nave.films.length-1];

    let prifetch = await fetch(primeraAparicion);
    let ultfetch = await fetch(ultimaAparicion);

    let prires = await prifetch.json();
    let ultres = await ultfetch.json();
  
    let cantidad = nave.films.length;

      starshipsContainer.innerHTML += `
      <article class="character-chart">
      <h2 class="nombre">${nave.name}</h2>
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
async function mostrarNavesTrilogia(lista){
 
  let starshipsContainer = document.getElementById('Naves');
  starshipsContainer.innerHTML="";
  let cantidad = 0;

  if (trilogia==="original"){
    for (const naves of lista){
        let yaMarcado = false;
      let apariciones = [];
      for (let n = 0; n<naves.films.length;n++){
        let aparicion = await fetch (naves.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length
        let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        if ((apariciones[m]==="A New Hope" || apariciones[m]==="The Empire Strikes Back" || apariciones[m]==="Return of the Jedi")&&yaMarcado===false){
          starshipsContainer.innerHTML+=`
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
    for (const nave of lista){
      let yaMarcado = false;
      let apariciones = [];
      for (let n = 0; n<nave.films.length;n++){
        let aparicion = await fetch (nave.films[n])
        let apares = await aparicion.json()
        let apatitle = await apares.title
        apariciones.push(apatitle)
      }
      cantidad=apariciones.length;
        let prires = apariciones[0];
      let ultres = apariciones[apariciones.length-1]
      for (let m = 0; m<apariciones.length;m++){
        if ((apariciones[m]==="The Phantom Menace" || apariciones[m]==="Attack of the Clones" || apariciones[m]==="Revenge of the Sith")&&yaMarcado===false){
          starshipsContainer.innerHTML+=`
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
async function cargar(){

    document.getElementById('Personajes').innerHTML="";
    document.getElementById('Planetas').innerHTML="";
    let main = document.getElementById('Cuadrado-Principal');
    
      if (Categoria.value==="Todos"){
         let Personajes = await cargarPersonajes();
      let Planetas = await cargarPlanetas();
      let Naves = await cargarNaves();
      main.innerHTML=`
         <h3 class="tituloCat">Personajes</h2>
        <section class="personajes" id="Personajes">
        </section>
        <div class="separacion"></div>
        <h3 class="tituloCat">Planetas</h3>
        <section class="planetas" id="Planetas">
        </section>
        <div class="separacion"></div>
        <h3 class="tituloCat">Naves</h3>
        <section class="naves" id="Naves">
        </section>
        `;

      if (trilogia===""){
        mostrarPersonajes(Personajes);
        mostrarPlanetas(Planetas);
        mostrarNaves(Naves);
      }
      else{
        mostrarPersonajesTrilogia(Personajes);
        mostrarPlanetasTrilogia(Planetas);
        mostrarNavesTrilogia(Naves)
      }
      }
      else if (Categoria.value==="Planetas"){
      let Planetas = await cargarPlanetas();
      main.innerHTML=`
        <section class="personajes" id="Personajes">
        </section>
        <h3 class="tituloCat">Planetas</h3>
        <section class="planetas" id="Planetas">
        </section>
        <section class="naves" id="Naves">
        </section>
        `;

      if (trilogia===""){
        mostrarPlanetas(Planetas);
      }
      else{
        mostrarPlanetasTrilogia(Planetas);
      }
      }
      else if (Categoria.value="Personajes"){
         let Personajes = await cargarPersonajes();
         main.innerHTML=`
        <h3 class="tituloCat">Personajes</h2>
        <section class="personajes" id="Personajes">
        </section>
        <section class="planetas" id="Planetas">
        </section>
        <section class="naves" id="Naves">
        </section>
        `;

      if (trilogia===""){
        mostrarPersonajes(Personajes);
      }
      else{
        mostrarPersonajesTrilogia(Personajes);
      }
      }
      else{
        let Naves = await cargarNaves();
         main.innerHTML=`
        <section class="personajes" id="Personajes">
        </section>
        <section class="planetas" id="Planetas">
        </section>
        <h3 class="tituloCat">Naves</h3>
        <section class="naves" id="Naves">
        </section>
        `;

      if (trilogia===""){
        mostrarNaves(Naves);
      }
      else{
        mostrarNavesTrilogia(Naves);
      }
      }
}
Categoria.addEventListener("change", ()=>{
  cargar();
});
  cargar();