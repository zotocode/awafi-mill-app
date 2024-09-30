// src/routes/ProductRoutes.ts
import express from "express";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductModel } from "../../infrastructure/model/producModel";
import { upload } from "../../config/multerConfig";
import IDHandler from "../../application/services/hashIdServices";



// Set up dependencies
const hashIdHandler= new IDHandler()
const productRepo = new ProductRepository(ProductModel);
const productInteractor = new ProductInteractor(productRepo,hashIdHandler);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();

// Define routes
productRoutes.post("/",upload.array('images', 5),productController.addProduct.bind(productController));
productRoutes.get("/", productController.getAllProducts.bind(productController));
productRoutes.get("/:id", productController.getProductById.bind(productController));
// productRoutes.put("/products/:id", productController.updateProduct.bind(productController));
// productRoutes.delete("/products/:id", productController.deleteProduct.bind(productController));

export default productRoutes;
