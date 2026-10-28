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
});
Previous.addEventListener("click" ,() =>{
  if (i===1){
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