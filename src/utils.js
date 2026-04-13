import { dirname } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "./config/env.js";

const filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(filePath);

export default __dirname;

export function generateToken(user) {
    return jwt.sign(user, env.JWT_SECRET);
}

export function validateToken(token, secret) {
    return jwt.verify(token, secret);
}

export function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

export function cookieExtractor(req) {
    if (req && req.cookies) return req.cookies["jwt"];
}