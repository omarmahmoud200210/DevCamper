import express from "express";
import {
    getCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../controllers/course.controller.js";

const courseRouter = express.Router({ mergeParams: true });


courseRouter.get("/", getCourses);
courseRouter.get("/:id", getSingleCourse);

courseRouter.post("/", createCourse);

courseRouter.put("/:id", updateCourse);

courseRouter.delete("/:id", deleteCourse);

export default courseRouter; 