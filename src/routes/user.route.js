import express from "express";
import { renderUsers, deleteUsers } from "../controllers/users.controller.js";
import authenticateUser from "../middleware/auth.js";
import { authorization } from "../middleware/roles.js";

const usersRouter = express.Router();

usersRouter.get(
    "/dashboard",
    authenticateUser,
    authorization("admin"),
    renderUsers
);

usersRouter.delete(
    "/:id",
    authenticateUser,
    authorization("admin"),
    deleteUsers
);

export default usersRouter;