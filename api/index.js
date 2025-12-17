import app from "../src/server.js";
import { connectWithMongoDB } from "../src/config/mongo.js";
import dotenv from "dotenv";
dotenv.config();


export default async (req, res) => {
  await connectWithMongoDB(process.env.MONGO_URL);
  return app(req, res);
};
