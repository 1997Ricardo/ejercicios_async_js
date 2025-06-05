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
