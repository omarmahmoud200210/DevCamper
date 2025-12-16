import express from "express";
import {
    renderLoginPage,
    handleLogin
} from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.get("/", renderLoginPage);
loginRouter.post("/", handleLogin);

export default loginRouter;