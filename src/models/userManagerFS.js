import fs from "fs";
import path from "path";
import __dirname from "../utils.js";

class UserManager {
    constructor() {
        this.path = path.join(__dirname, "data", "users.json");
    }

    async getUsers() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error("Error en la operacion:", error);
            return [];
        }
    }

    async createUser(user) {
        try {
            const users = await this.getUsers();

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                ...user
            };

            users.push(newUser);
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
            return newUser;
        } catch (error) {
            console.error("Error en la operacion:", error);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const users = await this.getUsers();
            const user = users.find(u => u.id === id);
            return user || null;
        } catch (error) {
            console.error("Error en la operacion:", error);
            return null;
        }
    }

    async getUserByEmail(email) {
        try {
            const users = await this.getUsers();
            const user = users.find(u => u.email === email);
            return user || null;
        } catch (error) {
            console.error("Error en la operacion:", error);
            return null;
        }
    }

    async updateUser(id, data) {
        try {
            const users = await this.getUsers();
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                users[index] = { ...users[index], ...data };
                await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
                return users[index];
            }
            return null;
        } catch (error) {
            console.error("Error en la operacion:", error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const users = await this.getUsers();
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                const deletedUser = users.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
                return deletedUser[0];
            }
            return null;
        } catch (error) {
            console.error("Error en la operacion:", error);
            throw error;
        }
    }
}

export const userManagerFS = new UserManager();