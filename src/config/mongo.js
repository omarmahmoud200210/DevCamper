import mongoose from "mongoose"

const connectWithMongoDB = async (url) => await mongoose.connect(url);

export { connectWithMongoDB };
