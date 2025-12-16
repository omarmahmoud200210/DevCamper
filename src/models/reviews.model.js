import { Schema } from "mongoose";
import mongoose from "mongoose";


const reviewsSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
    },
    text: {
        type: String,
        required: [true, "Please add a text"],
    },
    rating: {
        type: Number,
        required: [true, "Please add a rating"],
    },
    bootcamp: {
        type: Schema.Types.ObjectId,
        ref: "Bootcamp",
        required: [true, "Please add a bootcamp"],
    },
});


reviewsSchema.statics.getAverageRating = async function (bootcampId) {
    const obj = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        { $group: { _id: bootcampId, averageRating: { $avg: "$rating" } } }
    ]);

    try {
        if (obj[0]) {
            await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
                averageRating: Math.ceil(obj[0].averageRating),
            });
        }

        else {
            await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
              averageRating: 0,
            });
        }
    }   
    catch (err) {
        console.log(err);
    }
}


reviewsSchema.post("save", function () {
    this.constructor.getAverageRating(this.bootcamp);
});


reviewsSchema.post("deleteOne", { document: true, query: false }, function () {
    this.constructor.getAverageRating(this.bootcamp);
});


const Reviews = mongoose.model("reviews", reviewsSchema);
export default Reviews;
