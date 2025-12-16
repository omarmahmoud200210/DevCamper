process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import Bootcamp from "./models/bootcamp.model.js";
import Course from "./models/courses.model.js";
import Review from "./models/reviews.model.js";
import { connectWithMongoDB } from "./config/mongo.js";

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

connectWithMongoDB(process.env.MONGO_URL)
  .then(() => console.log("--> Connected with MongoDB from SEEDER".blue.bold))
  .catch((err) =>
    console.log("Failed to connect with MongoDB from SEEDER".red.bold, err)
  );

// Read Bootcamps JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "bootcamps.json"), "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "courses.json"), "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "reviews.json"), "utf-8")
);


// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await Review.create(reviews);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany(); 
    await Review.deleteMany();
    
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") importData();
else if (process.argv[2] === "-delete") deleteData();