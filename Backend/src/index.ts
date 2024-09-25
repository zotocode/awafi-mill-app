import express, { Request, Response, NextFunction } from "express";
import userRoute from "./routes/userRoute";
import { connectDB } from "./infrastruture/database/dbConfig";
import cors from "cors";
import morgan from "morgan";


const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const app = express();
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS configuration
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    // User routes
    app.use('/api/users', userRoute);

    // 500 - Internal Server Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("Error:", err.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    });

    // Start the server
    app.listen(3000, () => {
      console.log(`Server active on port: ${3000}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
