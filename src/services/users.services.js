import UsersDAO from "../models/dao/UsersDAOMongo.js";

class UsersService {
    constructor(dao) {
        this.dao = dao;
    }

    async getAllUsers() {
        return await this.dao.getAll();
    }

    async updateUser(email, update) {
        return await this.dao.updateByEmail(email, update);
    }

    async deleteUser(email) {
        return await this.dao.deleteByEmail(email);
    }
}

export default new UsersService(UsersDAO);