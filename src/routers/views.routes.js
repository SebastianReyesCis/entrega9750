import { Router } from "express";
import { validateSession } from "../middlewares/session.middlewares.js";
import { failedRegister, login, notFound, profile, register } from "../controllers/views.controllers.js";

const router = Router();

router.get("/login", login);
router.get("/register", register);
router.get("/failed-register", failedRegister);
router.use(validateSession);
router.get("/profile", profile);
router.use(notFound);

export default router;