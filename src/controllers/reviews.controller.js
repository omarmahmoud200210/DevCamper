import asyncHandler from "../middleware/async.js";
import Bootcamp from "../models/bootcamp.model.js";
import Reviews from "../models/reviews.model.js";

const getAllReviews = asyncHandler(async (req, res, next) => {
  let query, bootcamp;

  if (req.params.bootcampId) {
    query = Reviews.find({ bootcamp: req.params.bootcampId });
    bootcamp = await Bootcamp.findById(req.params.bootcampId);
  } else {
    query = Reviews.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const reviews = await query;
  return res.render("bootcampReviews", { reviews, bootcamp });
  //res.status(200).json({ success: true, count: reviews.length, data: reviews });
});

const createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return res
      .status(404)
      .json({ success: false, message: "Bootcamp not found" });
  }

  const review = await Reviews.create(req.body);
  return res.status(201).json({ success: true, data: review });
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true, data: review });
});

const renderAddReview = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return res
      .status(404)
      .json({ success: false, message: "Bootcamp not found" });
  }
  return res.render("addReview", { bootcamp });
});

const renderReviewsDashboard = asyncHandler(async (req, res, next) => {
  const reviews = await Reviews.find().populate("bootcamp");
  return res.render("reviewsDashboard", { reviews });
});

export {
  getAllReviews,
  createReview,
  deleteReview,
  renderAddReview,
  renderReviewsDashboard,
};
