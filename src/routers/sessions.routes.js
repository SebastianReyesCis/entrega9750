import { Router, json, urlencoded } from "express";
import passport from "passport";
import { authenticateConfig } from "../config/passport.js";
import { currentSession, logout } from "../controllers/sessions.controllers.js";

const router = Router();

router.get("/current", currentSession);

router.get("/github-login", passport.authenticate("github", authenticateConfig));

router.use(json(), urlencoded({ extended: false }));

router.post("/login", passport.authenticate("login", authenticateConfig));

router.post("/logout", logout);

export default router;