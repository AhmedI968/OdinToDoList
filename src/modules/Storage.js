// Moudle meant to handle localStorage\
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Task from './Task.js';

export default class Storage {
    static saveAllProjects(projects) {
        localStorage.setItem('ProjectList', JSON.stringify(projects));
    }

    static getAllProjects() {
        let projectList = Object.assign(new ProjectList(), JSON.parse(localStorage.getItem('ProjectList')));
        projectList.setProjects(projectList.getProjects().map(project => {
            let newProject = Object.assign(new Project(), project);
            newProject.setTasks(newProject.getTasks().map(task => Object.assign(new Task(), task)));
            return newProject;
        }));
        return projectList;
    }

    static getProject(projectName) {
        let projectList = Storage.getAllProjects();
        return projectList.getProject(projectName);
    };

    static saveProject(projectName) {
        let projectList = Storage.getAllProjects();
        projectList.addProject(projectName);
        Storage.saveAllProjects(projectList);
    }

    static removeProject(projectName) {
        let projectList = Storage.getAllProjects();
        projectList.removeProject(projectName);
        Storage.saveAllProjects(projectList);
    }

    static saveTask(projectName, task) {
        let projectList = Storage.getAllProjects();
        projectList.getProject(projectName).addTask(task);
        Storage.saveAllProjects(projectList);
    }

    static removeTask(projectName, task) {
        let projectList = Storage.getAllProjects();
        projectList.getProject(projectName).removeTask(task);
        Storage.saveAllProjects(projectList);
    }

    static removeAllTasks(projectName) {
        let projectList = Storage.getAllProjects();
        projectList.getProject(projectName).setTasks([]);
        Storage.saveAllProjects(projectList);
    }

    static getTask(projectName, taskTitle) {
        let projectList = Storage.getAllProjects();
        return projectList.getProject(projectName).getTask(taskTitle);
    }

    static updateToday() {
        let projectList = Storage.getAllProjects();
        projectList.updateToday();
        Storage.saveAllProjects(projectList);
    }

    static updateThisWeek() {
        let projectList = Storage.getAllProjects();
        projectList.updateThisWeek();
        Storage.saveAllProjects(projectList);
    }
};