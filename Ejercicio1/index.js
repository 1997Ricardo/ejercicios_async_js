// 1. URL de la API
const API_URL = 'https://thronesapi.com/api/v2/Characters';

// 2. Obtener referencias a elementos del DOM
const selectElement   = document.getElementById('character-list');
const imageElement    = document.getElementById('character-image');
const nameSpan        = document.querySelector('#name span');
const titleSpan       = document.querySelector('#title span');
const familySpan      = document.querySelector('#family span');
const themeToggleBtn  = document.getElementById('theme-toggle');
const bodyElement     = document.body;
// 3. Array donde guardaremos los personajes
let characters = [];

/**
 * 4. Función que pide a la API y devuelve un array con personajes
 */
async function fetchAllCharacters() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log('Personajes recibidos:', data.map(p => p.fullName));
    return data;
  } catch (error) {
    console.error('Error al cargar personajes:', error);
    return [];
  }
}
