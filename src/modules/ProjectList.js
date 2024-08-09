// Purpose of this file is to display the list of projects in the project list page

export default class ProjectList {
    constructor(projects = []) {
        this.projects = projects;
    }

    // Getters
    getProjects() {
        return this.projects;
    }

    // Setters
    setProjects(projects) {
        this.projects = projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        this.projects = this.projects.filter(p => p !== project);
    }
};