// src/presentation/routes/categoryRoutes.ts
import express from "express";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository"; 
import { CategoryController } from "../controllers/categoryController"; 
import { CategoryInteractor } from "../../application/interactor/categoryInteractor"; 
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";
import SubCategoryModel from "../../infrastructure/model/subCategoryModel";
import { SubCategoryInteractor } from "../../application/interactor/subCategoryInteractor";
import { SubCategoryController } from "../controllers/subCategoryController";
import { uploadCategoryImage } from '../../config/multerConfig';
import CloudinaryService from "../../application/services/cloudinaryService";

// Set up dependencies
const categoryRepo = new CategoryRepository(CategoryModel);
const cloudinaryService = new CloudinaryService();
const categoryInteractor = new CategoryInteractor(categoryRepo, cloudinaryService);
const categoryController = new CategoryController(categoryInteractor);

const subCategoryRepo = new SubCategoryRepository(SubCategoryModel);
const subCategoryInteractor = new SubCategoryInteractor(subCategoryRepo);
const subCategoryController = new SubCategoryController(subCategoryInteractor);

const categoryRoutes = express.Router();



// Admin Routes for Main and Subcategories
// Subcategory Admin Routes
categoryRoutes.post("/category/sub/admin", subCategoryController.addCategory.bind(subCategoryController));
categoryRoutes.get("/category/sub/admin", subCategoryController.getAllCategories.bind(subCategoryController));
categoryRoutes.get("/category/search/sub/admin", subCategoryController.searchBySubCategoryName.bind(subCategoryController));
categoryRoutes.get("/listedCategory/sub/admin/:mainCategoryid", subCategoryController.getListedCategories.bind(subCategoryController));
categoryRoutes.get("/category/sub/admin/:id", subCategoryController.getCategoryById.bind(subCategoryController));
categoryRoutes.put("/category/sub/admin/:id", subCategoryController.updateCategory.bind(subCategoryController));
categoryRoutes.patch("/category/sub/admin/:id", subCategoryController.toggleListStatus.bind(subCategoryController));
categoryRoutes.patch("/category/sub/delete/admin/:id", subCategoryController.deleteCategory.bind(subCategoryController));

// Main Category Admin Routes
categoryRoutes.post("/category/admin", uploadCategoryImage.single('photo'), categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category/admin", categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/search/admin", categoryController.searchByCategoryName.bind(categoryController));
categoryRoutes.get("/listedCategory/admin", categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/admin/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/admin/:id", uploadCategoryImage.single('photo'), categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/admin/:id", categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/admin/:id", categoryController.deleteCategory.bind(categoryController));


// User Routes for Main and Subcategories
// Subcategory User Routes
categoryRoutes.get("/listedCategory/sub/:mainCategoryid", subCategoryController.getListedCategories.bind(subCategoryController));
categoryRoutes.get("/category/sub/:id", subCategoryController.getCategoryById.bind(subCategoryController));

// Main Category User Routes
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));
export default categoryRoutes;
