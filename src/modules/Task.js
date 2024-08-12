

// Task class
export default class Task {
    constructor(title, description, dueDate = 'No Date', priority='', projectName='Inbox') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.projectName = projectName;
    }

    // Getters
    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    getNotes() {
        return this.notes;
    }

    getProject() {
        return this.projectName;
    }

    // Setters

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    setNotes(notes) {
        this.notes = notes;
    }

    setprojectName(projectName) {
        this.projectName = projectName;
    }
}