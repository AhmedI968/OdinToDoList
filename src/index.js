import './style.css';
import UI from './modules/UI.js';

UI.loadUI();
const button = document.querySelector('.add-button');
button.addEventListener('click', UI.addProject);