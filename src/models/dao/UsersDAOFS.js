import fs from "fs";
import path from "path";
import __dirname from "../../utils.js"

class UsersDAO {

    constructor() {
        this.path = path.join(__dirname, "data", "users.json");
    }

    async getAll() {
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

    async updateByEmail(email, update) {
        try {
            const users = await this.getUsers();
            const index = users.findIndex(u => u.email === email);
            if (index !== -1) {
                users[index] = { ...users[index], ...update };
                await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));
                return users[index];
            }
            return null;
        } catch (error) {
            console.error("Error en la operacion:", error);
            throw error;
        }
    }

    async deleteByEmail(email) {
        try {
            const users = await this.getUsers();
            const index = users.findIndex(u => u.email === email);
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

export default new UsersDAO();