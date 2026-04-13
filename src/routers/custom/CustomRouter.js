import { Router, json, urlencoded } from "express";

export class CustomRouter {
    router = Router();

    init() { };

    constructor() {
        this.init();
    }

    getRouter() {
        return this.router;
    }

    get(path, ...callbacks) {
        this.router.get(
            path,
            json(),
            urlencoded({extended : true}),            
            this.applyCallbacks(callbacks))
    }

    post(path, ...callbacks) {
        this.router.post(
            path,
            this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks) {
        this.router.post(
            path,
            this.applyCallbacks(callbacks))
    }

    delete(path, ...callbacks) {
        this.router.post(
            path,
            this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
            }
        })
    }
}