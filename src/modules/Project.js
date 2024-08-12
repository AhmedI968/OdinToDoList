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
        console.log(task);
        console.log(this.tasks);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t.getTitle() !== task);
    }

    // Create a function that returns the tasks due today
    getTasksDueToday() {
        return this.tasks.filter(task => isToday(toDate(task.getDueDate())));
    }

    // Create a function that returns the tasks due this week
    getTasksDueThisWeek() {
        const today = new Date();
        const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        return this.tasks.filter(task => toDate(task.getDueDate()) >= today && toDate(task.getDueDate()) <= nextWeek);
    }
};