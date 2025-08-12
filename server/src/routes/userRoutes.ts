import { Router } from "express";
import { getCurrentUserController } from "../controllers/userController";

export const userRoutes = Router();

userRoutes.get("/current-user", getCurrentUserController);
