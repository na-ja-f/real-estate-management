import { Router } from "express";
import { signup, login } from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login",auth, login)

export default router;
