export class Task {
    constructor(title, description, userId, createdAt = null) {
        this.id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.createdAt = createdAt || new Date().toISOString();
    }

    object_format() {
        return {
            id: this.id ?? null,
            title: this.title,
            description: this.description,
            userId: this.userId,
            createdAt: this.createdAt,
        };
    }

    
}