import express from "express";
import { handleLogout } from "../controllers/logout.controller.js";

const logoutRouter = express.Router();

logoutRouter.get("", handleLogout);

export default logoutRouter;