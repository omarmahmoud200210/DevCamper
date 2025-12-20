import Bootcamp from "../models/bootcamp.model.js";
import asyncHandler from "../middleware/async.js";
import User from "../models/user.model.js";
import geo from "../utils/geocoder.js";
import { ErrorResponse } from "../middleware/errors.js";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getAllBootCamps = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit", "skip", "name"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)/g, (match) => `$${match}`);

  query = Bootcamp.find(JSON.parse(queryStr))
    .populate("courses")
    .populate("reviews");

  // Select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortFields = req.query.sort.split(",").join(" ");
    query = query.sort(sortFields);
  } else query = query.sort("createdAt");

  // name
  if (req.query.name) {
    query = query.find({ name: { $regex: req.query.name, $options: "i" } });
  }

  // zipcode and distance
  if (req.query.zipcode && req.query.distance) {
    const { zipcode, distance } = req.query;

    const loc = await geo.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    const radius = distance / 3963;

    query = query.find({
      location: {
        $geoWithin: { $centerSphere: [[lng, lat], radius] },
      },
    });
  }

  // rating and budget
  if (req.query.rating) {
    query = query.find({ averageRating: { $gte: req.query.rating } });
  }

  if (req.query.budget) {
    query = query.find({ averageCost: { $lte: req.query.budget } });
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(skip).limit(limit);

  const bootcamps = await query;

  // Handle Pagination
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
      total,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
      total,
    };
  }

  const totalPages = Math.ceil(total / limit);

  res.render("bootcamps", {
    bootcamps,
    pagination,
    totalPages,
    page,
    name: req.query.name,
    zipcode: req.query.zipcode,
    distance: req.query.distance,
    rating: req.query.rating,
    budget: req.query.budget,
    user: req.user,
  });
});

const getSingleBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate("courses");
  res.render("bootDetails", { bootcamp });
});

const createBootCamps = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  const bootcamp = await Bootcamp.create(req.body);
  return res.status(201).json({ success: true, data: bootcamp });
});

const uploadPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse("Please upload a photo", 400));
  }

  const photo = req.files.file;

  if (!photo.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Please upload an image", 400));
  }

  photo.name = `photo_${bootcamp._id}${path.parse(photo.name).ext}`;

  cloudinary.v2.uploader.upload(
    photo.tempFilePath,
    { folder: "bootcamps_photos" },
    async (err, result) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorResponse(`Photo upload failed: ${err.message}`, 400)
        );
      }

      bootcamp.photo = result.secure_url;
      bootcamp.photoId = result.public_id;
      await bootcamp.save();

      fs.unlinkSync(photo.tempFilePath);

      res.status(200).json({ success: true, data: bootcamp });
    }
  );
});

const updateBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

const deleteBootCamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  cloudinary.v2.uploader.destroy(bootcamp.photoId);

  await bootcamp.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

const getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geo.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({ success: true, data: bootcamps });
});

const renderBootcampDashboard = asyncHandler(async (req, res, next) => {
  const role = req.user.role;

  if (role === "publisher") {
    const bootcamps = await Bootcamp.find({ user: req.user._id }).populate(
      "courses"
    );
    const user = await User.findById(req.user._id);
    const name = user.username;
    const role = user.role;

    res.render("bootDashboard", { bootcamps, name, role });
  } else if (role === "admin") {
    const bootcamps = await Bootcamp.find().populate("courses");
    const name = req.user.username;
    const role = req.user.role;

    res.render("bootDashboard", { bootcamps, name, role });
  }
});

const renderAddBootcamp = asyncHandler(async (req, res, next) => {
  res.render("addbootcamp");
});

export {
  getAllBootCamps,
  getSingleBootCamps,
  createBootCamps,
  updateBootCamps,
  deleteBootCamps,
  getBootcampInRadius,
  renderBootcampDashboard,
  renderAddBootcamp,
  uploadPhoto,
};
