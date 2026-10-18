import { User } from "./user.js";
import { readFile, writeFile } from "node:fs/promises";

export class Users {
    #allUsers;
    #file = new URL("./db.json", import.meta.url);

    async load() {
        const res = await readFile(this.#file, "utf8");
        const data = JSON.parse(res);

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
        await writeFile(
            this.#file,
            JSON.stringify({
                users: this.#allUsers.map(user => user.object_format())
            }, null, 4)
        );
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