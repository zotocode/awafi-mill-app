// src/routes/ProductRoutes.ts
import express from "express";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductModel } from "../../infrastructure/model/producModel";
import { upload } from "../../config/multerConfig";
import { validateProductInput } from "../middleware/produtValidation";





const productRepo = new ProductRepository(ProductModel);
const productInteractor = new ProductInteractor(productRepo);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();

// fuctional routes-----------
productRoutes.get("/product/filter", productController.FilterProducts.bind(productController));

// Define routes
productRoutes.post("/product",upload.array('images', 5),productController.addProduct.bind(productController));
productRoutes.patch("/product/update-img",upload.single('image'),productController.updateImage.bind(productController));
productRoutes.get("/product", productController.getAllProducts.bind(productController));
productRoutes.get("/product/:id", productController.getProductById.bind(productController));
productRoutes.put("/product/:id", productController.updateProduct.bind(productController));
productRoutes.patch("/product/:id", productController.toggleListStatus.bind(productController));
productRoutes.patch("/product/delete/:id", productController.deleteProduct.bind(productController));








export default productRoutes;
