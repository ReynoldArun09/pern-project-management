import { Router } from "express";
import { joinWorkspaceController } from "../controllers/memberController";

export const memberRoutes = Router();

memberRoutes.post("/workspace/:inviteCode/join", joinWorkspaceController);
