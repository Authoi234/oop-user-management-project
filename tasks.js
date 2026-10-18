import { Database } from "./database";

class Tasks extends Database {
    #allTasks;

    async load() {
        await super.loadTasks();

        const data = this.getTasksData()

        this.#allTasks = data.tasks.map(recordedTask => {
            const task = new Task(
                recordedTask.title,
                recordedTask.description,
                recordedTask.userId,
                recordedTask.createdAt
            );
            task.id = recordedTask.id;
            return task;
        });
    }

    async save() {
        this.getTasksData().tasks = this.#allTasks.map(
            task => task.object_format()
        );
        await super.save("tasks")
    }

    getTasks() {
        return [...this.#allTasks]
    }
}