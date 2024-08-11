// Moudle meant to handle localStorage\
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Task from './Task.js';

export default class Storage {
    static saveAllProjects(projects) {
        localStorage.setItem('ProjectList', JSON.stringify(projects));
    }

    static getAllProjects(projects) {
        let projectList = Object.assign(new ProjectList(), JSON.parse(localStorage.getItem('ProjectList')));
        projectList.setProjects(projectList.getProjects().map(project => {
            let newProject = Object.assign(new Project(), project);
            newProject.setTasks(newProject.getTasks().map(task => Object.assign(new Task(), task)));
            return newProject;
        }));
        return projectList;
    }
};