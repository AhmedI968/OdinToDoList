// Moudle meant to handle localStorage\
import Project from './Project.js';
import ProjectList from './ProjectList.js';
import Task from './Task.js';

export default class Storage {
    static saveAllProjects(projects) {
        localStorage.setItem('ProjectList', JSON.stringify(projects));
    }
};