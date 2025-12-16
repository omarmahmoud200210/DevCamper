import express from "express";
import { renderResetPage, resetPassword } from "../controllers/reset.controller.js";

const resetRouter = express.Router();

resetRouter.get("/reset-password", renderResetPage);

resetRouter.post("/reset-password", resetPassword);

export default resetRouter;
