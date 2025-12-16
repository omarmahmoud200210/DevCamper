import mongoose from "mongoose";
import { Schema } from "mongoose";
import slugify from "slugify";
import geo from "../utils/geocoder.js";

const bootCampSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
    unique: true,
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },

  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
    required: true,
  },

  phone: {
    type: String,
    maxlength: [20, "Phone number can not be more than 20 characters"],
    required: true,
  },

  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use a valid email",
    ],
    required: true,
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  location: {
    type: {
      type: String,
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [0, 0],
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  formattedAddress: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,

  careers: {
    type: [String],
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must be at most 10"],
  },

  averageCost: Number,

  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  housing: {
    type: Boolean,
    default: false,
  },

  jobAssistance: {
    type: Boolean,
    default: false,
  },

  jobGuarantee: {
    type: Boolean,
    default: false,
  },

  scholarship: {
    type: Boolean,
    default: false,
  },

  acceptGi: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bootCampSchema.set("toJSON", { virtuals: true });
bootCampSchema.set("toObject", { virtuals: true });

bootCampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
});

bootCampSchema.pre("save", async function () {
  const loc = await geo.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipCode: loc[0].zipcode,
    country: loc[0].country,
  };
});


bootCampSchema.pre("deleteOne", { document: true, query: false } , async function () { 
  await this.model("Course").deleteMany({ bootcamp: this._id });
  console.log("Course removed as the bootcamp removed :))")
});

bootCampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false
});

bootCampSchema.virtual("reviews", {
  ref: "reviews",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false
});

const Bootcamp = mongoose.model("Bootcamp", bootCampSchema);

export default Bootcamp;
