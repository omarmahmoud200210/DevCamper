import express from "express";
import {
  renderManageAccount,
  updateAccount,
  updatePassword,
} from "../controllers/account.controller.js";
import authenticationMiddleware from "../middleware/auth.js";

const accountRouter = express.Router();

accountRouter.get("/", authenticationMiddleware, renderManageAccount);
accountRouter.put("/updatedetails", authenticationMiddleware, updateAccount);
accountRouter.put("/updatepassword", authenticationMiddleware, updatePassword);

export default accountRouter;