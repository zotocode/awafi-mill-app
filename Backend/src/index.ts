import express, { Request, Response, NextFunction } from "express";
import 
userRoute from "./presentation/routes/userRoute";
import productRoute from "./presentation/routes/productRoute";
import cartRoutes from "./presentation/routes/cartRoute";
import categoryRoute from "./presentation/routes/categoryRoute";
import { connectDB } from "./infrastructure/database/dbConfig";
import cors from "cors";
import morgan from "morgan";
import adminRoute from "./presentation/routes/adminRoute";
import logger from "./utilities/logger";


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
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );


    app.use('/api/user', userRoute);
    app.use('/api/admin',adminRoute)
    app.use('/api/products', productRoute);
    app.use('api/cart',cartRoutes)
    app.use('/api/categories', categoryRoute);


    

    // 500 - Internal Server Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error('Errors :', err);
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
