let i=1;

fetch('https://swapi.dev/api/people/?page='+String(i)) 
  .then(response => response.json()) 
  .then(data => {   
    console.log('API funcionando:');
    let datos=data.results
    mostrarPersonajes(datos)
  })
  .catch(error => {               
    console.error('No se pudo traer la API. Error:', error);
  });

Next.addEventListener("click", ()=>{
  if (i===9){
    document.getElementById('Cuadrado-Interaccion').innerHTML=`
     <div class="previous" id="Previous">PREVIOUS</div>
        <select id="MoviesFilter" class="movies">
            <option value="">TODAS</option>
            <option value="The Phantom Menace">La amenaza fantasma</option>
            <option value="Attack of the Clones">El ataque de los clones</option>
            <option value="Revenge of the Sith">La venganza de los sith</option>
            <option value="A New Hope">Una nueva esperanza</option>
            <option value="The Empire Strikes Back">El imperio contrataca</option>
            <option value="Return of the Jedi">El retorno del jedi</option>
        </select>
        <div class="filtrar" id="Filtrar">Filtrar</div>
    `
    fetch('https://swapi.dev/api/people/?page='+String(i))      
    .then(response => response.json())  
    .then(data => {                     
      let datos=data.results       
      mostrarPersonajes(datos)
    })
    .catch(error => {                   
      console.error('No se pudo traer la API. Error:', error);
    });
  }
  else{
    i++;
    fetch('https://swapi.dev/api/people/?page='+String(i))          
    .then(response => response.json()) 
    .then(data => {                    
      let datos=data.results        
      mostrarPersonajes(datos)
    })
    .catch(error => {                  
      console.error('No se pudo traer la API. Error:', error);
    });
  }
  console.log(i)
});
Previous.addEventListener("click" ,() =>{
  if (i===1){
    document.getElementById('Cuadrado-Interaccion').innerHTML=`
    <select id="MoviesFilter" class="movies">
            <option value="">TODAS</option>
            <option value="phantomMenace">La amenaza fantasma</option>
            <option value="attackOfTheClones">El ataque de los clones</option>
            <option value="revengeOfTheSith">La venganza de los sith</option>
            <option value="aNewHope">Una nueva esperanza</option>
            <option value="empireStrikesBack">El imperio contrataca</option>
            <option value="returnOfTheJedi">El retorno del jedi</option>
        </select>
        <div class="filtrar" id="Filtrar">Filtrar</div>
        <div class="next" id="Next">NEXT</div>
    `
    fetch('https://swapi.dev/api/people/?page='+String(i))      
    .then(response => response.json())  
    .then(data => {                     
      let datos=data.results         
      mostrarPersonajes(datos)
    })
    .catch(error => {                   
      console.error('No se pudo traer la API. Error:', error);
    });
  }
  else{
    i--;
    fetch('https://swapi.dev/api/people/?page='+String(i))         
    .then(response => response.json())  
    .then(data => {                     
      let datos=data.results        
      mostrarPersonajes(datos)
    })
    .catch(error => {            
      console.error('No se pudo traer la API. Error:', error);
    });
  }
  console.log(i)
})


  let characters=[];

  const charactersContainer= document.getElementById('Personajes')

  async function mostrarPersonajes(lista){
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
  async function filtrarPorPelicula (pelicula){
    charactersContainer.innerHTML="";
    if (pelicula===""){
      fetch('https://swapi.dev/api/people/?page='+String(i))         
    .then(response => response.json())  
    .then(data => {                     
      let datos=data.results
      console.log(datos)        
      mostrarPersonajes(datos)
    })
    .catch(error => {            
      console.error('No se pudo traer la API. Error:', error);
    });
    }
    else{
      console.log("hola")
    let personajes = [];
    let personajesListaMedia= [];

    for (let n = 1; n<10;n++){
      await fetch('https://swapi.dev/api/people/?page='+String(n))         
    .then(response => response.json())  
    .then(data => {                     
      let datos=data.results        
      personajesListaMedia=datos
      console.log(personajesListaMedia)
    })
    .catch(error => {            
      console.error('No se pudo traer la API. Error:', error);
    });
    for (let m=0;m<personajesListaMedia.length;m++){
      for (let o=0; o<personajesListaMedia[m].films.length;o++){
        let peliculan = await fetch(personajesListaMedia[m].films[o])
        let peliculanjson = peliculan.json();
        let esta = false;
        for (let p = 0; p<personajes.length;p++){
          if (personajes[p]===personajesListaMedia[m]){
            esta=true
          }
        }
        if (esta===false){
          if (peliculanjson.title===pelicula){
          personajes.push(personajesListaMedia[m])
        }
        }
      }
    }
    }
    mostrarPersonajes(personajes)
    }
  }


MoviesFilter.addEventListener("change", () => {
  filtrarPorPelicula(MoviesFilter.value);
});