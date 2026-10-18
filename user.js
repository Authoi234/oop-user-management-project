import { hashPassword, verifyPassword } from "./hash_password.js";

export class User {
    #username
    #password

    constructor(name, job, username, hash_password) {
        console.log("Creating User.")
        this.name = name
        this.#username = username;
        this.job = job
        this.#password = hash_password;
        this.profile_pic_url = "";
    }

    static async create(name, job, username, pass) {
        const hash = await hashPassword(pass);
        return new this(name, job, username, hash);
    }

    updateName(name) {
        this.name = typeof name == 'string' && name.length >= 4 ? name : this.name;
    }

    getUsername() {
        return this.#username;
    }

    updateProfilePic(url) {
        this.profile_pic_url = url;
    }

    updateJob(job) {
        this.job = job;
    }

    async updateUsernameHandle(newUsername, password) {
        const match = await verifyPassword(password, this.#password);
        this.#username = match && newUsername.trim().length > 0 ? newUsername : this.#username;
        if (!match) return "Wrong Password."
        return "Username updated.";
    }

    object_format() {
        return {
            id: this.id ?? null,
            name: this.name,
            job: this.job,
            username: this.#username,
            password: this.#password,
            profile_pic_url: this.profile_pic_url,
        };
    }
}

export class Admin extends User {
    #usersManager;

    constructor(name, job, username, hash_password, usersManager) {
        super(name, job, username, hash_password);
        this.#usersManager = usersManager;
    }

    viewUsers() {
        return this.#usersManager.getUsers();
    }

    addUser(user) {
        this.#usersManager.addUser(user);
    }

    removeUser(user) {
        this.#usersManager.removeUser(user);
    }
}

export class Task {
    constructor(id, title, description, userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.createdAt = new Date().toISOString();
    }
}