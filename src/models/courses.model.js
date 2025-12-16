import mongoose from "mongoose";
import { Schema } from "mongoose";

const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: [true, "Please add a bootcamp"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    { $group: { _id: bootcampId, averageCost: { $avg: "$tuition" } } },
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost),
    });
  } catch (err) {
    console.log(err);
  }
};

CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.post("deleteOne", { document: true, query: false }, function () {
  this.constructor.getAverageCost(this.bootcamp);
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
