import Task from './Task.js';
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js';

export default class UI {

    static loadUI() {
        UI.displayProjects();
        // UI.displayTasks('Inbox');
        // UI.addEventListenersButtons();
    }

    static addProject() {
        const projectList = Storage.getAllProjects();
        const projectName = prompt('Enter the project name');
        const projectDescription = prompt('Enter the project description');
        projectList.addProject(new Project(projectName, projectDescription));
        Storage.saveAllProjects(projectList);
        UI.displayProjects();
    }

    static removeProject(projectName) {
        const projectList = Storage.getAllProjects();
        projectList.removeProject(projectName);
        Storage.saveAllProjects(projectList);
        UI.displayProjects();
    }

    static displayProjects() {
        const projectList = Storage.getAllProjects();
        const projects = projectList.getProjects();
        const projectListElement = document.querySelector('.project-container');
        projectListElement.innerHTML = '';
        projects.forEach(project => {
            if (project.getTitle() === 'Inbox' || project.getTitle() === 'Today' || project.getTitle() === 'This Week') return;
            const projectElement = document.createElement('li');
            projectElement.textContent = project.getTitle();
            projectElement.classList.add('project-element');
            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => {
                UI.removeProject(project.getTitle());
            });
            projectElement.appendChild(removeButton);
            // projectElement.addEventListener('click', () => {
            //     UI.displayTasks(project.getTitle());
            // });
            projectListElement.appendChild(projectElement);
        });
    }
}