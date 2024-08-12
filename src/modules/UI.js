import Task from './Task.js';
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js';

export default class UI {

    static loadUI() {
        UI.displayProjects();
        UI.displayTasks('Inbox');
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

    static takeTaskDetails() {
        const projectList = Storage.getAllProjects();
        const main = document.getElementById('mainContent');
        const addTaskButton = main.lastChild;
        const projectName = main.firstChild.textContent;
        main.removeChild(main.lastChild);
        const taskDetailsHTML = `
            <div id="taskDetails">
                <input type="text" id="taskTitle" placeholder="Title">
                <textarea id="taskDescription" placeholder="Description"></textarea>
                <input type="date" id="taskDueDate">
                <select id="taskPriority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button id="submitTaskDetails" class="add-button">Add Task</button>
            </div>
        `;
        const taskDetails = document.createElement('div');
        taskDetails.innerHTML = taskDetailsHTML;
        main.appendChild(taskDetails);
        const submitTaskDetails = document.getElementById('submitTaskDetails');
        submitTaskDetails.addEventListener('click', () => {
            const taskTitle = document.getElementById('taskTitle').value;
            const taskDescription = document.getElementById('taskDescription').value;
            const taskDueDate = document.getElementById('taskDueDate').value;
            const taskPriority = document.getElementById('taskPriority').value;
            const project = Storage.getProject(projectName);
            const newTask = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, projectName)
            Storage.saveTask(projectName, newTask);
            console.log(project.getTasks());
            main.removeChild(main.lastChild);
            main.appendChild(addTaskButton);
            UI.displayTasks(projectName);
        });
    }

    static removeTask(projectName, taskTitle) {
        Storage.removeTask(projectName, taskTitle);
        UI.displayTasks(projectName);
    };

    static displayTasks(projectName) {
        const projectList = Storage.getAllProjects();
        const project = projectList.getProject(projectName);
        const tasks = project.getTasks();
        const taskListElement = document.getElementById('mainContent');
        taskListElement.innerHTML = '';
        const header = document.createElement('h2');
        header.textContent = projectName;
        header.classList.add('project-header');
        const taskListContainer = document.createElement('ul');
        taskListElement.appendChild(header);
        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.textContent = task.getTitle();
            taskElement.classList.add('task-element');
            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.classList.add('remove-button');
            // removeButton.addEventListener('click', () => {
            //     UI.removeTask(projectName, task.getTitle());
            // });
            // taskElement.appendChild(removeButton);
            // taskElement.addEventListener('click', () => {
            //     UI.displayTaskDetails(projectName, task.getTitle());
            // });
            taskListContainer.appendChild(taskElement);
        });
        taskListElement.appendChild(taskListContainer);
        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = '+';
        addTaskButton.classList.add('add-button');
        addTaskButton.addEventListener('click', () => {
            UI.takeTaskDetails();
        });
        taskListElement.appendChild(addTaskButton);
    };

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
            projectElement.addEventListener('click', () => {
                UI.displayTasks(project.getTitle());
            });
            projectListElement.appendChild(projectElement);
        });
    }
}