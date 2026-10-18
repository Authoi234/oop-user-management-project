export class Task {
    constructor(title, description, userId, createdAt=null) {
        this.id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.createdAt = createdAt || new Date().toISOString();
    }
}