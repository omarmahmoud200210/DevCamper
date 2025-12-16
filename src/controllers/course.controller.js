import asyncHandler from "../middleware/async.js";
import Bootcamp from "../models/bootcamp.model.js";
import Course from "../models/courses.model.js";


const getCourses = asyncHandler(async (req, res) => {
    let query;
    
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    }

    else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;
    res.status(200).json({ success: true, count: courses.length, data: courses }); 
});


const getSingleCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description"
    });

    if (!course) {
        return res.status(404).json({ success: false, error: "Course not found" });
    }

    return res.status(200).json({ success: true, data: course });
});

const createCourse = asyncHandler(async (req, res) => {
    req.body.bootcamp = req.params.bootcampId;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return res.status(404).json({ success: false, error: "Bootcamp not found" });
    }

    const course = await Course.create(req.body);
    return res.status(201).json({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ success: false, error: "Course not found" });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: course });
});

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ success: false, error: "Course Not Found" });
    }

    await course.deleteOne();
    res.status(200).json({ success: true, data: {} });
});

export {
    getCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
}