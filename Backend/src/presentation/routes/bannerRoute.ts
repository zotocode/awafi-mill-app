// src/presentation/routes/cartRoute.ts
import express from "express";
import { BannerController } from "../controllers/bannerController"; 
import { BannerInteractor } from "../../application/interactor/bannerInteractor";
import { uploadImages } from "../../config/multerConfig";
import CloudinaryService from "../../application/services/cloudinary";
import { verifyAdminToken } from "../middleware/adminAuthMiddleware";


// Set up dependencies
const cloudinaryService = new CloudinaryService()
const bannerInteractor  = new BannerInteractor(cloudinaryService)
const bannerController = new BannerController(bannerInteractor)


const bannerRoutes = express.Router();

// Define routes

bannerRoutes.post("/offerBanner",verifyAdminToken,uploadImages.single('image'),bannerController.addOfferBanner.bind(bannerController))
bannerRoutes.get("/allBanners",verifyAdminToken,bannerController.allBanners.bind(bannerController))
bannerRoutes.post("/unlistBanner",verifyAdminToken,bannerController.unlistBanner.bind(bannerController))
bannerRoutes.post("/deleteBanner",verifyAdminToken,bannerController.deleteBanner.bind(bannerController))
bannerRoutes.get("/viewWelcomeBanner",bannerController.welcomeBanners.bind(bannerController))
bannerRoutes.get("/viewOfferBanner",bannerController.offerBanners.bind(bannerController))
bannerRoutes.get("/viewCollectionBanner",bannerController.collectionBanners.bind(bannerController))


export default bannerRoutes;