

// Task class
export default class {
    constructor(title, description, dueDate = 'No Date', priority, notes, checklist, project='Inbox') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.project = project;
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

    getChecklist() {
        return this.checklist;
    }

    getProject() {
        return this.project;
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

    setChecklist(checklist) {
        this.checklist = checklist;
    }

    setProject(project) {
        this.project = project;
    }

    // Add a task to a project
    addTaskToProject(project) {
        project.addTask(this);
    }
}