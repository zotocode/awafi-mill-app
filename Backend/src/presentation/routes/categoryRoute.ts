// src/presentation/routes/cartRoute.ts
import express from "express";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository"; 
import { CategoryController } from "../controllers/categoryController"; 
import { CategoryInteractor } from "../../application/interactor/categoryInteractor"; 
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";
import SubCategory from "../../infrastructure/model/subCategoryModel";
import { SubCategoryInteractor } from "../../application/interactor/subCategoryInteractor";
import { SubCategoryController } from "../controllers/subCategoryController";

// Set up dependencies
// main Category------
const categoryRepo = new CategoryRepository(CategoryModel);
const categoryInteractor = new CategoryInteractor(categoryRepo);
const categoryController = new CategoryController(categoryInteractor);
// subCategory-----
const subCategoryRepo = new SubCategoryRepository(SubCategory);
const subCategoryInteractor = new SubCategoryInteractor(subCategoryRepo);
const subcategoryController = new SubCategoryController(subCategoryInteractor);

const categoryRoutes = express.Router();

// Main Category Routes---------------------------

// Sub - Category Routes--------------------------------------------

categoryRoutes.post("/category/sub",subcategoryController.addCategory.bind(subcategoryController));
categoryRoutes.get("/category/sub", subcategoryController.getAllCategories.bind(subcategoryController));
categoryRoutes.get("/listedCategory/sub/:Id", subcategoryController.getListedCategories.bind(subcategoryController));
categoryRoutes.get("/category/sub/:id", subcategoryController.getCategoryById.bind(subcategoryController));
categoryRoutes.put("/category/sub/:id", subcategoryController.updateCategory.bind(subcategoryController));
categoryRoutes.patch("/category/sub/:id", subcategoryController.toggleListStatus.bind(subcategoryController));
categoryRoutes.patch("/category/sub/delete/:id", subcategoryController.deleteCategory.bind(subcategoryController));

// Define routes
categoryRoutes.post("/category",categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category", categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/listedCategory", categoryController.getListedCategories.bind(categoryController));
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/:id", categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/:id", categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/:id", categoryController.deleteCategory.bind(categoryController));



export default categoryRoutes;
