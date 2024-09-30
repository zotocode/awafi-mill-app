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

// Define routes
productRoutes.post("/product",upload.array('images', 5),validateProductInput,productController.addProduct.bind(productController));
productRoutes.get("/product", productController.getAllProducts.bind(productController));
productRoutes.get("/product/:id", productController.getProductById.bind(productController));
productRoutes.patch("/product/:id",validateProductInput, productController.updateProduct.bind(productController));
// productRoutes.delete("/products/:id", productController.deleteProduct.bind(productController));

export default productRoutes;
