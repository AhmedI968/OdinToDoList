import Project from './Project.js';

export default class ProjectList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Inbox', 'This is the default project. It shows all the tasks.'));
        this.projects.push(new Project('Today', 'Tasks due today.'));
        this.projects.push(new Project('This Week', 'Tasks due this week.'));
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

    getProject(title) {
        return this.projects.find(project => project.getTitle() === title);
    }

    removeProject(title) {
        this.projects = this.projects.filter(p => p.getTitle() !== title);
    }

    // Create a function that will update today and this week projects

    updateToday() {
        const today = this.getProject('Today');
        const todayTasks = [];
        this.projects.forEach(project => {
            if (project.getTitle() === 'Inbox' || project.getTitle() === 'Today' || project.getTitle() === 'This Week') return;
            project.getTasksDueToday().forEach(task => {
                todayTasks.push(task);
            });
        });
        today.setTasks(todayTasks);
    }

    updateThisWeek() {
        const thisWeek = this.getProject('This Week');
        const thisWeekTasks = [];
        this.projects.forEach(project => {
            if (project.getTitle() === 'Inbox' || project.getTitle() === 'Today' || project.getTitle() === 'This Week') return;
            project.getTasksDueThisWeek().forEach(task => {
                thisWeekTasks.push(task);
            });
        });
        thisWeek.setTasks(thisWeekTasks);
    }

    updateInbox() {
        const inbox = this.getProject('Inbox');
        const inboxTasks = [];
        this.projects.forEach(project => {
            if (project.getTitle() === 'Inbox' || project.getTitle() === 'Today' || project.getTitle() === 'This Week') return;
            project.getTasks().forEach(task => {
                inboxTasks.push(task);
            });
        });
        inbox.setTasks(inboxTasks);
    };
};