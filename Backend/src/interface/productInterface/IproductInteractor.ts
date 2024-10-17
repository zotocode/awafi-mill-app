import mongoose from "mongoose";
import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO"; 
import { responseHandler } from '../../types/commonTypes'; // Corrected spelling

export default interface IProductInteractor {
  addProduct(data: ProductCreationDTO): Promise<ProductDTO | responseHandler>; // Ensure responseHandler is correctly spelled
  fetchByCategory(
    mainCategoryId: mongoose.Types.ObjectId | null, 
    subCategoryId: mongoose.Types.ObjectId | null
  ): Promise<ProductDTO[] | null>;
  
  getAllProducts(): Promise<ProductDTO[]>;
  
  getAllListedProducts(): Promise<ProductDTO[]>;
  
  getProductById(id: mongoose.Types.ObjectId): Promise<ProductDTO | null>;
  
  updateProduct(
    id: mongoose.Types.ObjectId, 
    data: Partial<ProductCreationDTO>
  ): Promise<ProductDTO | null | responseHandler>;
  
  deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>; 
  
  listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  
  unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  
  updateImage(
    id: mongoose.Types.ObjectId, 
    index: number, 
    file: string
  ): Promise<any>;
}

