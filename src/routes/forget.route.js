import express from "express";
import {
  renderForgetPasswordPage,
  authenticateUser,
} from "../controllers/forget.controller.js";

const forgotRouter = express.Router();

forgotRouter.get("/forget-password", renderForgetPasswordPage);
forgotRouter.post("/auth/forget-password", authenticateUser);

export default forgotRouter;
