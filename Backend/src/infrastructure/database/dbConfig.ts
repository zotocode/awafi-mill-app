import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/Awafi-mobile");
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Database connection error: ${err.message}`);
    } else {
      console.error(`Unknown database connection error:, ${err}`);
    }
    process.exit(1); // Exit the process if the connection fails
  }
};