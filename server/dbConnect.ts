import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";

const dbConnect = async (): Promise<void> => {
  const mongoUri = process.env.MONGOURI;

  if (!mongoUri) {
    throw new Error("MongoDB URI is not defined in environment variables.");
  }

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log(`✅ MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default dbConnect;
