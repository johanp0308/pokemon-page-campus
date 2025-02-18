import { mostrarApi, mostrarApiPokemon } from "./apiFunctions.js";
import { alertPokemon } from "./alert-pokemon.js";

const contenedorPokemon = document.querySelector(".contenedor-pokemons");

export const mostrarTarjeta = async (urlApiLimit) => {
  const data = await mostrarApi(urlApiLimit);
  data.forEach(async (element) => {
    const individualData = await mostrarApiPokemon(element);

    let imagenPokemon = individualData.sprites.front_default;
    const urlColor = await (await fetch(individualData.species.url)).json();
    const color = urlColor.color.name;
    const estiloCaja = `color: ${color};border: 1.5px solid ${color};`;

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pokemon";
    contenedor.id = individualData.id;
    contenedor.style.cssText = estiloCaja;

    contenedor.innerHTML = `
    <div class="contenedor-img">
      <img src="${imagenPokemon}" alt="Pokemon ${individualData.name}" />
    </div>
    <div class="contenedor-titulo">
      <h3>${individualData.name.toUpperCase()}</h3>
    </div>
  `;
    contenedorPokemon.appendChild(contenedor);
    contenedor.addEventListener("click", async () => {
      alertPokemon(individualData);
    });
  });
};
