import { hashPassword } from "./hash_password.js";
import { Task } from "./task.js";
import { Tasks } from "./tasks.js";
import { Admin, User } from "./user.js";
import { Users } from "./users.js";

const admin_password = (await hashPassword("Password123")) || process.env.Admin_Password;

const userManager = new Users();
const tasks = new Tasks();
await userManager.load();
await tasks.load();

const admin = await new Admin(
    "Admin",
    "Administrator",
    "admin",
    admin_password,
    userManager,
    tasks,
);

const createUser = async (name, job, username, password) => {
    const user = await User.create(name, job, username, password);
    await admin.addUser(user);
    return user;
}

const assignTask = async (title, description, userid) => {
    const task = new Task(title, description, userid);
    await admin.addTask(task);
    return task;
}


// app starts

//~ all passwords are hashed by bcrypt - slow process but secure ~//

const authoi = await createUser("Authoi", "Developer", "Authoi234", "secret123");
await createUser("Auvro", "Developer", "Auvro123", "passwordsecret");

const username_authoi = authoi.username
console.log(username_authoi);
console.log(admin.viewUsers());

await assignTask("Learn Algorithm", "Learn 1 week of algorithm", userManager.getUserId(username_authoi));
await assignTask("Learn Montumia's System design", "Complete within today", userManager.getUserId(username_authoi));
await assignTask("Complete python part 2", "Learn requeset module fast", userManager.getUserId("Auvro123"));

console.log(admin.viewTasks());
console.log(admin.getTaskOfUser(username_authoi));