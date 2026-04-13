import { connect } from "mongoose";
import { env } from "./env.js";

export default class MongoSingleton {
    static #instance;
    constructor() {
        connect(env.MONGO_URL)
    }

    static getInstance() {
        if (this.#instance) {
            console.log("ya habia una instancia conectada");
            return this.#instance;
        } else {
            this.#instance = new MongoSingleton();
            console.log("conectado a la db");
            return this.#instance;
        }
    }
}