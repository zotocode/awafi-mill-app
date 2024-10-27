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
<<<<<<< HEAD
import {uploadCategoryImage} from '../../config/multerConfig'
=======
import { uploadCategoryImage } from '../../config/multerConfig';
>>>>>>> upstream/develop
import CloudinaryService from "../../application/services/cloudinaryService";

// Set up dependencies
const categoryRepo = new CategoryRepository(CategoryModel);
<<<<<<< HEAD
const cloudinaryService=new CloudinaryService()
const categoryInteractor = new CategoryInteractor(categoryRepo,cloudinaryService);
=======
const cloudinaryService = new CloudinaryService();
const categoryInteractor = new CategoryInteractor(categoryRepo, cloudinaryService);
>>>>>>> upstream/develop
const categoryController = new CategoryController(categoryInteractor);

const subCategoryRepo = new SubCategoryRepository(SubCategoryModel);
const subCategoryInteractor = new SubCategoryInteractor(subCategoryRepo);
const subCategoryController = new SubCategoryController(subCategoryInteractor);

const categoryRoutes = express.Router();



<<<<<<< HEAD
categoryRoutes.post("/category/sub",subcategoryController.addCategory.bind(subcategoryController));

categoryRoutes.get("/category/sub", subcategoryController.getAllCategories.bind(subcategoryController));
categoryRoutes.get("/category/search/sub", subcategoryController.searchBySubCategoryName.bind(subcategoryController));
categoryRoutes.get("/listedCategory/sub/:Id", subcategoryController.getListedCategories.bind(subcategoryController));
categoryRoutes.get("/category/sub/:id", subcategoryController.getCategoryById.bind(subcategoryController));

categoryRoutes.put("/category/sub/:id", subcategoryController.updateCategory.bind(subcategoryController));
categoryRoutes.patch("/category/sub/:id", subcategoryController.toggleListStatus.bind(subcategoryController));
categoryRoutes.patch("/category/sub/delete/:id", subcategoryController.deleteCategory.bind(subcategoryController));


// Define routes
categoryRoutes.post("/category",uploadCategoryImage.single('photo'),categoryController.addCategory.bind(categoryController));

categoryRoutes.get("/category", categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/search", categoryController.searchByCategoryName.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));

categoryRoutes.put("/category/:id",uploadCategoryImage.single('photo'), categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/:id", categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/:id", categoryController.deleteCategory.bind(categoryController));



=======
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
>>>>>>> upstream/develop
export default categoryRoutes;
