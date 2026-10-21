fetch('https://swapi.dev/api/people')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('API funcionando:');
    let datos=data.results
    console.log(datos)          // Asignar el JSON a la variable comidas
    mostrarPersonajes(datos)
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('No se pudo traer la API. Error:', error);
  });

  let characters=[];

  const charactersContainer= document.getElementById('Personajes')

  function mostrarPersonajes(lista){
    charactersContainer.innerHTML=""

    lista.forEach(personaje => {
        charactersContainer.innerHTML += `
        <article class="character-chart">
        <h2 class="nombre">${personaje.name}</h2>
        </article>
        `
    });
  }