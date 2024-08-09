import {isToday, toDate} from 'date-fns'

export default class Project {
    constructor(title, description, tasks = []) {
        this.title = title;
        this.description = description;
        this.tasks = tasks;
    }

    // Getters
    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getTasks() {
        return this.tasks;
    }

    // Setters

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }

    // Create a function that returns the tasks due today
    getTasksDueToday() {
        return this.tasks.filter(task => isToday(toDate(task.getDueDate())));
    }
};