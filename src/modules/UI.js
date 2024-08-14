import Task from './Task.js';
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Storage from './Storage.js';

export default class UI {

    static loadUI() {
        UI.displayProjects();
        UI.displayTasks('Inbox');
        UI.addEventListenersButtons();
        Storage.updateToday();
        Storage.updateThisWeek();
    }

    static addEventListenersButtons() {
        const inboxBtn = document.getElementById('inbox-link');
        const todayBtn = document.getElementById('today-link');
        const weekBtn = document.getElementById('week-link');

        inboxBtn.addEventListener('click', () => {
            UI.displayTasks('Inbox');
        });

        todayBtn.addEventListener('click', () => {
            Storage.updateToday();
            UI.displayTasks('Today');
        });

        weekBtn.addEventListener('click', () => {
            Storage.updateThisWeek();
            UI.displayTasks('This Week');
        });
    }

    static addProject() {
        const projectBar = document.getElementById('projects');
        const projectButton = projectBar.lastChild;
        projectBar.removeChild(projectBar.lastChild);
        const projectContainer = document.createElement('div');
        const projectFormHTML = `
            <div id="projectForm">
                <input type="text" id="projectNameInput" placeholder="Project Name" required>
                <input type="text" id="projectDescriptionInput" placeholder="Project Description" required>
                <button id="submitProject" class="add-button-confirm">+</button>
            </div>
        `;
        projectContainer.innerHTML = projectFormHTML;
        projectBar.appendChild(projectContainer);
        const submitProject = document.getElementById('submitProject');
        submitProject.addEventListener('click', () => {
            const projectName = document.getElementById('projectNameInput').value;
            const projectDescription = document.getElementById('projectDescriptionInput').value;
            
            if (projectName === '' || projectDescription === '') {
                alert('Please fill in all fields');
                return;
            }
            const project = new Project(projectName, projectDescription);
            Storage.saveProject(project);
            projectBar.removeChild(projectBar.lastChild);
            projectBar.appendChild(projectButton);
            UI.displayProjects();
        });
    }

    static removeProject(projectName) {
        const projectList = Storage.getAllProjects();
        projectList.removeProject(projectName);
        Storage.saveAllProjects(projectList);
        UI.displayProjects();
        UI.displayTasks('Inbox');
    }

    static takeTaskDetails() {
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
            main.removeChild(main.lastChild);
            main.appendChild(addTaskButton);
            UI.displayTasks(projectName);
        });
    }

    static removeTask(projectName, taskTitle) {
        Storage.removeTask(projectName, taskTitle);
        UI.displayTasks(projectName);
    };

    static viewTaskDetails(projectName, taskTitle) {
        const task = Storage.getTask(projectName, taskTitle);
        let taskDetails = document.createElement('div');
        taskDetails.innerHTML = `
            <div id="taskDetailsView">
                <h2>${task.getTitle()}</h2>
                <p>${task.getDescription()}</p>
                <p>Due: ${task.getDueDate()}</p>
                <p>Priority: ${task.getPriority()}</p>
            </div>
        `;
        const otherMain = document.getElementById('mainContent');
        const taskElement = document.querySelector(`[data-task-id="${taskTitle}"]`);
        const taskDetailsDiv = taskDetails.querySelector('#taskDetails');
        taskDetailsDiv.addEventListener('click', () => {
            UI.viewTaskDetails(projectName, taskTitle);
        });
        if (taskElement) {
            otherMain.querySelector('ul').replaceChild(taskDetails, taskElement);
            UI.taskElements[taskTitle] = taskDetails;
        } else {
            UI.displayTasks(projectName);
        }
    };

    static editTaskDetails(projectName, taskTitle) {
        const task = Storage.getTask(projectName, taskTitle);
        let taskDetails1 = document.createElement('div');
        taskDetails1.innerHTML = `
            <div id="taskDetailsDiv">
                <input type="text" id="taskTitle" value="${task.getTitle()}" />
                <textarea id="taskDescription">${task.getDescription()}</textarea>
                <input type="date" id="taskDueDate" value="${task.getDueDate()}" />
                <select id="taskPriority">
                    <option value="Low" ${task.getPriority() === 'Low' ? 'selected' : ''}>Low</option>
                    <option value="Medium" ${task.getPriority() === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="High" ${task.getPriority() === 'High' ? 'selected' : ''}>High</option>
                </select>
                <button id="updateTaskDetails" class="update-task">Update</button>
            </div>
        `;
        const main = document.getElementById('mainContent');
        const taskElement = document.querySelector(`[data-task-id="${taskTitle}"]`);
        main.querySelector('ul').replaceChild(taskDetails1, taskElement);
        const updateTaskDetails = document.getElementById('updateTaskDetails');
        updateTaskDetails.addEventListener('click', () => {
            const newTaskTitle = document.getElementById('taskTitle').value;
            const newTaskDescription = document.getElementById('taskDescription').value;
            const newTaskDueDate = document.getElementById('taskDueDate').value;
            const newTaskPriority = document.getElementById('taskPriority').value;
            const newTask = new Task(newTaskTitle, newTaskDescription, newTaskDueDate, newTaskPriority, projectName);
            Storage.removeTask(projectName, taskTitle);
            Storage.saveTask(projectName, newTask);
            UI.displayTasks(projectName);
        });
        
    };

    static displayTasks(projectName) {
        const project = Storage.getProject(projectName);
        const tasks = project.getTasks();
        const taskListElement = document.getElementById('mainContent');
        taskListElement.innerHTML = '';
        const header = document.createElement('h2');
        header.textContent = projectName;
        header.classList.add('project-header');
        const taskListContainer = document.createElement('ul');
        taskListElement.appendChild(header);
        const description = document.createElement('h4');
        description.textContent = project.getDescription();
        description.classList.add('project-description-display');
        taskListElement.appendChild(description);
        if (tasks.length === 0) {
            const noTasks = document.createElement('p');
            noTasks.textContent = 'No tasks here.';
            noTasks.classList.add('no-tasks');
            taskListElement.appendChild(noTasks);
        } else {
            tasks.forEach(task => {
                const taskElement = document.createElement('li');
                taskElement.textContent = task.getTitle();
                taskElement.classList.add('task-element');
                taskElement.dataset.taskId = task.getTitle();
                const removeButton = document.createElement('button');
                removeButton.textContent = '-';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => {
                    UI.removeTask(projectName, task.getTitle());
                });
                const editTaskDetailsButton = document.createElement('button');
                editTaskDetailsButton.textContent = 'Edit';
                editTaskDetailsButton.classList.add('edit-button');
                taskElement.appendChild(removeButton);
                taskElement.appendChild(editTaskDetailsButton);
                taskElement.addEventListener('click', () => {
                    UI.viewTaskDetails(projectName, task.getTitle());
                });
                editTaskDetailsButton.addEventListener('click', (event) => {
                    event.stopPropagation()
                    UI.editTaskDetails(projectName, task.getTitle());
                });
                taskListContainer.appendChild(taskElement);
            });
        }
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
            projectElement.addEventListener('click', () => {
                UI.displayTasks(project.getTitle());
            });
            projectListElement.appendChild(projectElement);
        });
    }
}