import mongoose from 'mongoose';
import envConfig from '../../config/env';

export const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(envConfig.Atlas_Url);
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Database connection error: ${err.message}`);
    } else {
      console.error("Unknown database connection error:", err);
    }
    process.exit(1); // Exit the process if the connection fails
  }
};
