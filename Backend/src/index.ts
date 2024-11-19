import express, { Request, Response, NextFunction } from "express";
import
userRoute from "./presentation/routes/userRoute";
import productRoute from "./presentation/routes/productRoute";
import cartRoutes from "./presentation/routes/cartRoute";
import categoryRoute from "./presentation/routes/categoryRoute";
import bannerRoutes from "./presentation/routes/bannerRoute";
import { connectDB } from "./infrastructure/database/dbConfig";
import cors from "cors";
import morgan from "morgan";
import adminRoute from "./presentation/routes/adminRoute";
import logger from "./utilities/logger";
import wishlistRoutes from "./presentation/routes/wishlistRoute";
import checkoutRoutes from "./presentation/routes/checkoutRoute";
import { verifyToken } from "./presentation/middleware/userAuthMiddleware";
import reviewRoutes from "./presentation/routes/reviewRoute";
import orderRoutes from "./presentation/routes/orderRoute";
import subCategoryRoutes from "./presentation/routes/subCategoryRoute";
import envConfig from "./config/env";



const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const app = express();
    const port=envConfig.PORT
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS configuration
    app.use(
      cors({
        origin: envConfig.Frontend_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );


    app.use('/api/user', userRoute);
    app.use('/api/admin', adminRoute)
    app.use('/api/orders', orderRoutes)
    app.use('/api/products', productRoute);
    app.use('/api/cart', verifyToken, cartRoutes)
    app.use('/api/review', verifyToken, reviewRoutes)
    app.use('/api/wishlist', verifyToken, wishlistRoutes)
    app.use('/api/categories', categoryRoute); 
    app.use('/api/sub-categories', subCategoryRoutes);
    app.use('/api/banner', bannerRoutes);
    app.use('/api/checkout',verifyToken, checkoutRoutes);

    app.get('/test', (req: Request, res: Response) => {
      res.send("hai");
    });
    



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
    app.listen(port, () => {
      console.log(`Server active on port: ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();




// ts-node-dev --respawn --transpile-only src 