import { Router } from "express";
import { CreateUser, LoginUser } from "../controllers/user.controller.js";

const router = Router();

router.post('/CreateUser', CreateUser);
router.post('/LoginUser', LoginUser);

export default router;