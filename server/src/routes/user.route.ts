import { Router } from "express";
import {
  signup,
  login,
  getUsers,
  blockUser,
  changeRole,
} from "../controllers/user.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-Users", auth, getUsers);
router.patch("/block-User", auth, blockUser);
router.patch("/change-role", auth, changeRole);

export default router;
