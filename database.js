import { readFile, writeFile } from "node:fs/promises";

export class Database {
    #userfile = new URL("./users_db.json", import.meta.url);
    #taskfile = new URL("./tasks_db.json", import.meta.url);
    #usersdata;
    #tasksdata;

    getUserFile() {
        return this.#userfile;
    }

    getTaskFile() {
        return this.#taskfile;
    }

    async loadUsers() {
        const res = await readFile(this.#userfile, "utf8");
        this.#usersdata = JSON.parse(res);
    }

    async loadTasks() {
        const res = await readFile(this.#taskfile, "utf8");
        this.#tasksdata = JSON.parse(res);
    }

    getUserData() {
        if (!this.#usersdata) {
            throw new Error("Database has not been loaded.");
        }

        return this.#usersdata;
    }

    getTasksData() {
        if (!this.#tasksdata) {
            throw new Error("Database has not been loaded.");
        }

        return this.#tasksdata;
    }

    async save(db_name) {
        if (db_name === "users") {
            file = this.#userfile;
            data = this.#usersdata;
        } else if (db_name === "tasks") {
            file = this.#taskfile;
            data = this.#tasksdata;
        } else {
            throw new Error("Invalid database name");
        }

        await writeFile(file, JSON.stringify(data, null, 4));
    }
}