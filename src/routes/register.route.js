import { 
    renderRegisterPage,
    handleRegistration
} from "../controllers/register.controller.js";
import express from "express";

const registerRouter = express.Router();

registerRouter.get("/", renderRegisterPage);
registerRouter.post("/", handleRegistration);

export default registerRouter;