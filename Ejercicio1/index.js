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
/**
 * 5. Rellenar el <select> con person.id como value y person.fullName como texto
 */
function populateSelect(characters) {
    selectElement.innerHTML = '<option value="">— Elige un personaje —</option>';
    characters.forEach(person => {
      const option = document.createElement('option');
      option.value = person.id;            
      option.textContent = person.fullName;
      selectElement.appendChild(option);
    });
  }
  
  /**
   * 6. Mostrar en pantalla la imagen y datos del personaje seleccionado
   */
  function showCharacterInfo(selected) {
    if (!selected) {
      imageElement.src = '';
      imageElement.alt = '';
      nameSpan.textContent   = '';
      titleSpan.textContent  = '';
      familySpan.textContent = '';
      return;
    }
    imageElement.src = selected.imageUrl;
    imageElement.alt = 'Foto de ' + selected.fullName;
    nameSpan.textContent   = selected.fullName;
    titleSpan.textContent  = selected.title;
    familySpan.textContent = selected.family;
  }