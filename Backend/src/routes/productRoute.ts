// src/routes/ProductRoutes.ts
import express from "express";
import mongoose from "mongoose";
import { ProductRepository } from "../infrastrucutre/repositories/productRepository";
import { ProductController } from "../presentation/controllers/productController";
import { ProductInteractor } from "../application/interactor/productInteractor";
import {IProduct} from "../types/commonTypes"

// Create Mongoose schema
const productSchema = new mongoose.Schema<IProduct>({
  title: String,
  description: String,
  price: Number,
  inventory: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a Mongoose model
const ProductModel = mongoose.model<IProduct>("Product", productSchema);

// Set up dependencies
const productRepo = new ProductRepository(ProductModel);
const productInteractor = new ProductInteractor(productRepo);
const productController = new ProductController(productInteractor);

const productRoutes = express.Router();

// Define routes
productRoutes.post("/", productController.addProduct.bind(productController));
// productRoutes.get("/products", productController.getAllProducts.bind(productController));
// productRoutes.get("/products/:id", productController.getProductById.bind(productController));
// productRoutes.put("/products/:id", productController.updateProduct.bind(productController));
// productRoutes.delete("/products/:id", productController.deleteProduct.bind(productController));

export default productRoutes;
