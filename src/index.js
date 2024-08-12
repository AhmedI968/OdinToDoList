import './style.css';
import UI from './modules/UI.js';

UI.loadUI();
const button = document.querySelector('.add-project');
button.addEventListener('click', UI.addProject);
