import app from "../src/server.js";
import { connectWithMongoDB } from "../src/config/mongo.js";

export default async (req, res) => {
  await connectWithMongoDB(process.env.MONGO_URL);
  return app(req, res);
};
