// src/presentation/routes/subCategoryRoutes.ts
import express from "express";
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";
import SubCategoryModel from "../../infrastructure/model/subCategoryModel";
import { SubCategoryInteractor } from "../../application/interactor/subCategoryInteractor";
import { SubCategoryController } from "../controllers/subCategoryController";

// Set up dependencies
const subCategoryRepo = new SubCategoryRepository(SubCategoryModel);
const subCategoryInteractor = new SubCategoryInteractor(subCategoryRepo);
const subCategoryController = new SubCategoryController(subCategoryInteractor);

const subCategoryRoutes = express.Router();

// Subcategory Admin Routes
subCategoryRoutes.post("/category/sub/admin", subCategoryController.addCategory.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/admin", subCategoryController.getAllCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/search/sub/admin", subCategoryController.searchBySubCategoryName.bind(subCategoryController));
subCategoryRoutes.get("/listedCategory/sub/admin/:mainCategoryid", subCategoryController.getListedCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/admin/:id", subCategoryController.getCategoryById.bind(subCategoryController));
subCategoryRoutes.put("/category/sub/admin/:id", subCategoryController.updateCategory.bind(subCategoryController));
subCategoryRoutes.patch("/category/sub/admin/:id", subCategoryController.toggleListStatus.bind(subCategoryController));
subCategoryRoutes.patch("/category/sub/delete/admin/:id", subCategoryController.deleteCategory.bind(subCategoryController));

// Subcategory User Routes
subCategoryRoutes.get("/listedCategory/sub/:mainCategoryid", subCategoryController.getListedCategories.bind(subCategoryController));
subCategoryRoutes.get("/category/sub/:id", subCategoryController.getCategoryById.bind(subCategoryController));

export default subCategoryRoutes;
