import { hashPassword } from "./hash_password.js";
import { Admin, User } from "./user.js";
import { Users } from "./users.js";

const users = new Users();

await users.load();

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

await createUser("Authoi", "Developer", "Authoi123", "secret123");

console.log(admin.viewUsers());
const usere = admin.viewUsers()[0];
console.log(usere.getUsername());