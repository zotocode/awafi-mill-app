// src/routes/ProductRoutes.ts
import express from "express";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductModel } from "../../infrastructure/model/producModel";
import { uploadImages,uploadExcel } from "../../config/multerConfig";
import { validateProductInput } from "../middleware/produtValidation";
import CloudinaryService from "../../application/services/cloudinaryService";
import { ExcelService } from "../../application/services/excelService";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";
import CategoryModel from "../../infrastructure/model/categoryModel"; 
import SubCategoryModel from "../../infrastructure/model/subCategoryModel"; 
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";





const productRepo = new ProductRepository(ProductModel);
const categoryRepo=new CategoryRepository(CategoryModel)
const subCategoryRepo=new SubCategoryRepository(SubCategoryModel)
const cloudinaryService=new CloudinaryService()
const excelService=new ExcelService()
const productInteractor = new ProductInteractor(productRepo,cloudinaryService,excelService,categoryRepo,subCategoryRepo);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();

// fuctional routes-----------
productRoutes.get("/product/filter", productController.FilterProducts.bind(productController));
productRoutes.get("/product/search", productController.SearchByName.bind(productController));
productRoutes.post("/product/bulk/upload",uploadExcel.single('file'),productController.bulkAdding.bind(productController));
productRoutes.get("/product/bulk/download",productController.bulkDownload.bind(productController));
// Define routes
productRoutes.post("/product",uploadImages.array('images', 5),productController.addProduct.bind(productController));
productRoutes.patch("/product/update-img",uploadImages.single('image'),productController.updateImage.bind(productController));
productRoutes.get("/product", productController.getAllProducts.bind(productController));
productRoutes.get("/product/listed", productController.getAllListedProducts.bind(productController));
productRoutes.get("/product/:id", productController.getProductById.bind(productController));
productRoutes.put("/product/:id", productController.updateProduct.bind(productController));
productRoutes.patch("/product/:id", productController.toggleListStatus.bind(productController));
productRoutes.patch("/product/delete/:id", productController.deleteProduct.bind(productController));








export default productRoutes;
