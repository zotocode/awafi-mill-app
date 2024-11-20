// src/routes/ProductRoutes.ts
import express from "express";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductModel } from "../../infrastructure/model/producModel";
import { uploadImages, uploadExcel } from "../../config/multerConfig";
import CloudinaryService from "../../application/services/cloudinaryService";
import { ExcelService } from "../../application/services/excelService";
import { CategoryRepository } from "../../infrastructure/repositories/categoryRepository";
import CategoryModel from "../../infrastructure/model/categoryModel";
import SubCategoryModel from "../../infrastructure/model/subCategoryModel";
import { SubCategoryRepository } from "../../infrastructure/repositories/subCategoryRepository";
import { optionalAuth } from "../middleware/OptionalAuth";
import { verifyAdminToken } from "../middleware/adminAuthMiddleware";

const productRepo = new ProductRepository(ProductModel);
const categoryRepo = new CategoryRepository(CategoryModel);
const subCategoryRepo = new SubCategoryRepository(SubCategoryModel);
const cloudinaryService = new CloudinaryService();
const excelService = new ExcelService();
const productInteractor = new ProductInteractor(
  productRepo,
  cloudinaryService,
  excelService,
  categoryRepo,
  subCategoryRepo
);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();



// Admin product routes
productRoutes.get("/product/listed/admin",verifyAdminToken, productController.getAllListedProducts.bind(productController));
productRoutes.put("/product/admin/:id",verifyAdminToken, productController.updateProduct.bind(productController));
productRoutes.get("/product/admin/:id",verifyAdminToken, productController.getProductById.bind(productController));

productRoutes.get("/product/search/admin",verifyAdminToken, productController.SearchByName.bind(productController));
productRoutes.post("/product/bulk/upload/admin",verifyAdminToken, uploadExcel.single("file"), productController.bulkAdding.bind(productController));
productRoutes.get("/product/bulk/download/admin",verifyAdminToken, productController.bulkDownload.bind(productController));

productRoutes.post("/product/admin",verifyAdminToken, uploadImages.array("images", 5), productController.addProduct.bind(productController));
productRoutes.patch("/product/update-img/admin",verifyAdminToken, uploadImages.single("image"), productController.updateImage.bind(productController));
productRoutes.delete("/product/delete-img/admin",verifyAdminToken,  productController.deleteImage.bind(productController));
productRoutes.get("/product/admin",verifyAdminToken, productController.getAllProducts.bind(productController));
productRoutes.patch("/product/list-status/admin/:id",verifyAdminToken, productController.toggleListStatus.bind(productController));
productRoutes.patch("/product/delete/admin/:id",verifyAdminToken, productController.deleteProduct.bind(productController));
productRoutes.put("/product/:id",verifyAdminToken, productController.updateProduct.bind(productController));


// User product routes
productRoutes.get("/product/filter",optionalAuth, productController.FilterProductsForUser.bind(productController));
productRoutes.get("/product/listed",optionalAuth, productController.getAllListedProductsForUser.bind(productController));
productRoutes.get("/product/subCategory/:subCatId",optionalAuth, productController.listProductsBySubCategoryForUser.bind(productController));
productRoutes.get("/product/:id",optionalAuth, productController.getProductByIdForUser.bind(productController));
productRoutes.get("/product/mainCategory/:mainCatId",optionalAuth, productController.listProductsByMainCategoryForUser.bind(productController));

export default productRoutes;
