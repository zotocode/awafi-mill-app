// src/presentation/routes/categoryRoutes.ts
import express from "express";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository"; 
import { CategoryController } from "../controllers/categoryController"; 
import { CategoryInteractor } from "../../application/interactor/categoryInteractor"; 
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import { uploadCategoryImage } from '../../config/multerConfig';
import CloudinaryService from "../../application/services/cloudinaryService";

// Set up dependencies
const categoryRepo = new CategoryRepository(CategoryModel);
const cloudinaryService = new CloudinaryService();
const categoryInteractor = new CategoryInteractor(categoryRepo, cloudinaryService);
const categoryController = new CategoryController(categoryInteractor);

const categoryRoutes = express.Router();

// Main Category Admin Routes
categoryRoutes.post("/category/admin", uploadCategoryImage.single('photo'), categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category/admin", categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/search/admin", categoryController.searchByCategoryName.bind(categoryController));
categoryRoutes.get("/listedCategory/admin", categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/admin/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/admin/:id", uploadCategoryImage.single('photo'), categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/admin/:id", categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/admin/:id", categoryController.deleteCategory.bind(categoryController));

// Main Category User Routes
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));

export default categoryRoutes;
