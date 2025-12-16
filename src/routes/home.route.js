import express from "express";
import { renderLandingPage } from "../controllers/home.controller.js";
import authenticationMiddleware from "../middleware/auth.js";

const homeRouter = express.Router();

homeRouter.get("/", authenticationMiddleware, renderLandingPage);

export default homeRouter;
