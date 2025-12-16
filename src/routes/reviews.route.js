import express from "express";
import {
  getAllReviews,
  createReview,
  renderAddReview,
  renderReviewsDashboard,
  deleteReview,
} from "../controllers/reviews.controller.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.get("/", getAllReviews);
reviewsRouter.get("/create", renderAddReview);
reviewsRouter.get("/dashboard", renderReviewsDashboard);

reviewsRouter.post("/", createReview);

reviewsRouter.delete("/:id", deleteReview);

export default reviewsRouter;
