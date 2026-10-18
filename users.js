import { Database } from "./database.js";
import { User } from "./user.js";
import { readFile, writeFile } from "node:fs/promises";

export class Users extends Database {
    #allUsers;

    async load() {
        await super.loadUsers();

        const data = this.getUserData()

        this.#allUsers = data.users.map(recordedUser => {
            const user = new User(
                recordedUser.name,
                recordedUser.job,
                recordedUser.username,
                recordedUser.password
            );
            user.id = recordedUser.id;
            user.profile_pic_url = recordedUser.profile_pic_url ?? "";
            return user;
        });
    }

    async save() {
        this.getUserData().users = this.#allUsers.map(
            user => user.object_format()
        );
        await super.save("users")
    }

    getUsers() {
        return [...this.#allUsers]
    }

    async addUser(user) {
        if (!user.id) user.id = crypto.randomUUID();
        this.#allUsers.push(user);
        await this.save();
    }

    async removeUser(id_userToDelete) {
        this.#allUsers = this.#allUsers.filter(user => user?.id !== id_userToDelete);
        await this.save();
    }
}