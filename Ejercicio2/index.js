// 1) Rango de Pokémon de la primera generación (IDs 1–151)
const GEN1_MIN = 1;
const GEN1_MAX = 151;

// 2) Referencias a elementos del DOM
const imgElement      = document.getElementById('character-image');
const nameSpan        = document.querySelector('#name span');
const typeSpan        = document.querySelector('#type span');
const abilitySpan     = document.querySelector('#ability span');
const themeToggleBtn  = document.getElementById('theme-toggle');
const newPokemonBtn   = document.getElementById('new-pokemon-btn');
const bodyElement     = document.body;

// 3) Genera un número entero aleatorio entre min y max (ambos incluidos)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 4) Hace fetch a la PokeAPI para el Pokémon de ID dado
async function fetchPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de Pokémon:', error);
    return null;
  }
}

// 5) Muestra un Pokémon aleatorio: imagen, nombre, tipo principal y habilidad principal
async function showRandomPokemon() {
  const randomId = getRandomInt(GEN1_MIN, GEN1_MAX);
  const pokemonData = await fetchPokemonById(randomId);

  if (!pokemonData) {
    imgElement.alt = 'No se pudo cargar el Pokémon.';
    imgElement.src = '';
    nameSpan.textContent    = '';
    typeSpan.textContent    = '';
    abilitySpan.textContent = '';
    return;
  }

  // 5.1) Obtener la URL del "official artwork" frontal si existe
  let imageUrl = null;
  if (
    pokemonData.sprites &&
    pokemonData.sprites.other &&
    pokemonData.sprites.other['official-artwork'] &&
    pokemonData.sprites.other['official-artwork'].front_default
  ) {
    imageUrl = pokemonData.sprites.other['official-artwork'].front_default;
  } else if (pokemonData.sprites && pokemonData.sprites.front_default) {
    imageUrl = pokemonData.sprites.front_default;
  }

  // 5.2) Asignar imagen si existe
  if (imageUrl) {
    imgElement.src = imageUrl;
    imgElement.alt = `Imagen de ${capitalizeFirstLetter(pokemonData.name)}`;
  } else {
    imgElement.src = '';
    imgElement.alt = 'Imagen no disponible';
  }

  // 5.3) Rellenar nombre, tipo principal y habilidad principal
  nameSpan.textContent = capitalizeFirstLetter(pokemonData.name);

  if (pokemonData.types && pokemonData.types.length > 0) {
    typeSpan.textContent = capitalizeFirstLetter(pokemonData.types[0].type.name);
  } else {
    typeSpan.textContent = 'Desconocido';
  }

  if (pokemonData.abilities && pokemonData.abilities.length > 0) {
    abilitySpan.textContent = capitalizeFirstLetter(pokemonData.abilities[0].ability.name);
  } else {
    abilitySpan.textContent = 'Desconocida';
  }
}

// Función auxiliar para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 6) Alternar tema claro/oscuro
function toggleTheme() {
  bodyElement.classList.toggle('dark');
}

// 7) Cuando cargue la página, mostrar un Pokémon nuevo y asignar listeners
window.addEventListener('DOMContentLoaded', () => {
  showRandomPokemon();
  themeToggleBtn.addEventListener('click', toggleTheme);
  newPokemonBtn.addEventListener('click', showRandomPokemon);
});

