// src/routes/ProductRoutes.ts
import express from "express";
import { ProductRepository } from "../infrastrucutre/repositories/productRepository";
import { ProductController } from "../presentation/controllers/productController";
import { ProductInteractor } from "../application/interactor/productInteractor";
import { ProductModel } from "../infrastrucutre/model/producModel";


// Set up dependencies
const productRepo = new ProductRepository(ProductModel);
const productInteractor = new ProductInteractor(productRepo);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();

// Define routes
productRoutes.post("/", productController.addProduct.bind(productController));
productRoutes.get("/products", productController.getAllProducts.bind(productController));
productRoutes.get("/products/:id", productController.getProductById.bind(productController));
productRoutes.put("/products/:id", productController.updateProduct.bind(productController));
productRoutes.delete("/products/:id", productController.deleteProduct.bind(productController));

export default productRoutes;
