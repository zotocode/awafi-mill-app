// src/presentation/routes/categoryRoutes.ts
import express from "express";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository"; 
import { CategoryController } from "../controllers/categoryController"; 
import { CategoryInteractor } from "../../application/interactor/categoryInteractor"; 
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import { uploadCategoryImage } from '../../config/multerConfig';
import CloudinaryService from "../../application/services/cloudinaryService";
import { verifyAdminToken } from "../middleware/adminAuthMiddleware";

// Set up dependencies
const categoryRepo = new CategoryRepository(CategoryModel);
const cloudinaryService = new CloudinaryService();
const categoryInteractor = new CategoryInteractor(categoryRepo, cloudinaryService);
const categoryController = new CategoryController(categoryInteractor);

const categoryRoutes = express.Router();

// Main Category Admin Routes
categoryRoutes.post("/category/admin",verifyAdminToken, uploadCategoryImage.single('photo'), categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category/admin",verifyAdminToken, categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/search/admin",verifyAdminToken, categoryController.searchByCategoryName.bind(categoryController));
categoryRoutes.get("/listedCategory/admin",verifyAdminToken, categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/admin/:id",verifyAdminToken, categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/admin/:id",verifyAdminToken, uploadCategoryImage.single('photo'), categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/admin/:id",verifyAdminToken, categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/admin/:id",verifyAdminToken, categoryController.deleteCategory.bind(categoryController));

// Main Category User Routes
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));

export default categoryRoutes;