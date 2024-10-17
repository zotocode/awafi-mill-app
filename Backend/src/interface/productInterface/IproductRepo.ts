import mongoose from "mongoose";
import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import Product from "../../domain/entities/productSchema";

export interface IproductRepo {
  addProduct(productData: ProductCreationDTO): Promise<Product>;
  updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<Product | null>;
  findAllProducts(): Promise<Product[]>;
  findListedAllProducts(): Promise<Product[]>;
  productFindById(id: mongoose.Types.ObjectId): Promise<Product | null>;
  fetchByCategory(mainCategoryId: mongoose.Types.ObjectId | null, subCategoryId: mongoose.Types.ObjectId | null): Promise<ProductDTO[] | null>;
  updateImage(id: mongoose.Types.ObjectId, index: number, imageUrl: string): Promise<{ modifiedCount: number }>;
  deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
  updateListing(id: mongoose.Types.ObjectId, data: { isListed: boolean }): Promise<{ modifiedCount: number }>;
  isListedProduct(id: mongoose.Types.ObjectId): Promise<Product | null>; // Change return type to boolean
}
