import { hashPassword } from "./hash_password.js";
import { Task } from "./task.js";
import { Tasks } from "./tasks.js";
import { Admin, User } from "./user.js";
import { Users } from "./users.js";

const users = new Users();
const tasks = new Tasks();
await users.load();
await tasks.load();

const admin_password = (await hashPassword("Password123")) || process.env.Admin_Password;

const admin = await new Admin(
    "Admin",
    "Administrator",
    "admin",
    admin_password,
    users,
);

const createUser = async (name, job, username, password) => {
    const user = await User.create(name,job,username, password);
    await users.addUser(user);
    return user;
}

const assignTask = async (title, description, userid) => {
    const task = await Task(title, description, userid);
    await tasks.addTask(task);
    return task;
}

const authoi = await createUser("Authoi", "Developer", "Authoi123", "secret123");
await assignTask("Learn Algorithm", "Learn 1 week of algorithm", users.getUserByUsername(authoi.getUsername())?.id);


console.log(admin.viewUsers());
console.log(tasks);
const usere = admin.viewUsers()[0];
console.log(usere.getUsername());