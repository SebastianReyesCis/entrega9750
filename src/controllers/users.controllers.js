import usersServices from "../services/users.services.js";

export async function getAll(req, res) {
    const users = await usersServices.getAllUsers();
    res.json(users);
}

export async function updateUser(req, res) {
    const { email } = req.params;
    const update = req.body;
    const updatedUser = await usersServices.updateUser(email, update);
    res.json(updatedUser);
}

export async function deleteUser(req, res) {
    const { email } = req.params;
    const updatedUser = await usersServices.deleteUser(email);
    res.json(updatedUser);
}