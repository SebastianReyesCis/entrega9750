import { Router, json, urlencoded } from "express";
import passport from "passport";
import { getAll, updateUser, deleteUser } from "../controllers/users.controllers.js";

const router = Router();

router.get("/", getAll);
router.use(json(), urlencoded({ extended: false }));
router.post("/", passport.authenticate("register", { failureRedirect: "/register-failed", successRedirect: "/login" }));
router.param("email", (req, res, next, email) => {
    const regex = /^(?:\d+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
    if (!regex.test(email)) res.status(400).json({ error: "el formato de mail no es válido" });
    next();
});
router.route("/:email")
    .put(updateUser)
    .delete(deleteUser);
export default router;