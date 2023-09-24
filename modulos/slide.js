import { alertPokemon } from "./alert-boton.js";
import { mostrarApi, mostrarApiPokemon } from "./apiFunctions.js";

const contenedorPokemon = document.querySelector(".contenedor-pokemons");

export const pokemonSection = async (urlApi) => {
  const data = await mostrarApi(urlApi);

  data.forEach(async (element) => {
    const individualData = await mostrarApiPokemon(element);
    let imagenPokemon = individualData.sprites.front_default;
    //Agregar al slide
    contenedorPokemon.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div class="contenedor-pokemon" id= "${individualData.id}">
        <div class="contenedor-img">
          <img src="${imagenPokemon}" alt="Pokemon ${element.name}" />
        </div>
        <div class="contenedor-titulo">
          <h3>${element.name.toUpperCase()}</h3>
        </div>
      </div>
      `
    );

// Obtener el botón recién creado y agregar el evento click
    const nuevoBotonPoke = contenedorPokemon.querySelector(
      `.contenedor-pokemon[id="${individualData.id}"]`
    );
    
    nuevoBotonPoke.addEventListener("click", async() => {
      console.log(individualData.name)
      alertPokemon(individualData.name)
    });
  });
};
