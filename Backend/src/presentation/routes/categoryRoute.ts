// src/presentation/routes/cartRoute.ts
import express from "express";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository"; 
import { CategoryController } from "../controllers/categoryController"; 
import { CategoryInteractor } from "../../application/interactor/categoryInteractor"; 
import CategoryModel from "../../infrastructure/model/categoryModel"; 

// Set up dependencies
const categoryRepo = new CategoryRepository(CategoryModel);
const categoryInteractor = new CategoryInteractor(categoryRepo);
const categoryController = new CategoryController(categoryInteractor);

const categoryRoutes = express.Router();

// Define routes
categoryRoutes.post("/category",categoryController.addCategory.bind(categoryController));
categoryRoutes.get("/category", categoryController.getAllCategories.bind(categoryController));
categoryRoutes.get("/category/:id", categoryController.getCategoryById.bind(categoryController));
categoryRoutes.put("/category/:id", categoryController.updateCategory.bind(categoryController));
categoryRoutes.patch("/category/:id", categoryController.toggleListStatus.bind(categoryController));
categoryRoutes.patch("/category/delete/:id", categoryController.deleteCategory.bind(categoryController));

export default categoryRoutes;
