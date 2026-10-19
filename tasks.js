import { Database } from "./database.js";
import { Task } from "./task.js";

export class Tasks extends Database {
    #allTasks;

    async load() {
        await super.loadTasks();

        const data = this.getTasksData()

        this.#allTasks = data.tasks.map(recordedTask => {
            const task = new Task(
                recordedTask.title,
                recordedTask.description,
                recordedTask.userId,
                recordedTask.createdAt,
                recordedTask.id
            );
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

    getUserTask(id_of_user){
        return this.#allTasks.filter(task=> task.userId === id_of_user)
    }

    async addTask(task) {
        console.log(task.id)
        if (!task.id) task.id = crypto.randomUUID();
        console.log(task.id)
        this.#allTasks.push(task);
        await this.save();
    }

    async removeTask(id_taskToDelete) {
        this.#allTasks = this.#allTasks.filter(task => task?.id !== id_taskToDelete);
        await this.save();
    }
}