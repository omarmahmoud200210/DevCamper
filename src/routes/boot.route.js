import express from "express";
import {
  getAllBootCamps,
  getSingleBootCamps,
  createBootCamps,
  updateBootCamps,
  deleteBootCamps,
  uploadPhoto,
  getBootcampInRadius,
  renderBootcampDashboard,
  renderAddBootcamp,
} from "../controllers/boot.controller.js";
import courseRouter from "../routes/course.route.js";
import reviewsRouter from "../routes/reviews.route.js";
import authenticationMiddleware from "../middleware/auth.js";
import { authorization } from "../middleware/roles.js";
import result from "../middleware/result.js";
import Bootcamp from "../models/bootcamp.model.js";

const bootRouter = express.Router();

bootRouter.use("/:bootcampId/courses", courseRouter);
bootRouter.use("/:bootcampId/reviews", reviewsRouter);

bootRouter.get(
  "/",
  authenticationMiddleware,
  result(Bootcamp, "courses", "reviews"),
  getAllBootCamps
);

bootRouter.get(
  "/dashboard",
  authenticationMiddleware,
  authorization('admin', 'publisher'),
  renderBootcampDashboard
);

bootRouter.get(
  "/add",
  authenticationMiddleware,
  authorization("admin", "publisher"),
  renderAddBootcamp
);

bootRouter.get("/:id", getSingleBootCamps);
bootRouter.get("/radius/:zipcode/:distance", getBootcampInRadius);

bootRouter.post(
  "/",
  authenticationMiddleware,
  authorization("admin", "publisher"),
  createBootCamps
);

bootRouter.put(
  "/:id",
  authenticationMiddleware,
  authorization("admin", "publisher"),
  updateBootCamps
);

bootRouter.put(
  "/:id/photo",
  authenticationMiddleware,
  authorization("admin", "publisher"),
  uploadPhoto
);

bootRouter.delete(
  "/:id",
  authenticationMiddleware,
  authorization("admin", "publisher"),
  deleteBootCamps
);

export default bootRouter;
