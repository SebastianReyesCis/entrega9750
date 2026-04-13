import MongoStore from "connect-mongo";
import { env } from "./env.js";

export const sessionConfig = {
    cookie: {
        maxAge: 3600000,
        httpOnly: true
    },
    store: MongoStore.create({
        mongoUrl: env.MONGO_URL,
        ttl: 60,
        autoRemove: "interval",
        autoRemoveInterval: 70
    }),
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}