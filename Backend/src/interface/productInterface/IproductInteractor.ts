import mongoose from "mongoose";
import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO"; 
import { responseHandler } from '../../types/commonTypes'; // Corrected spelling
import {ProductResponseDTO} from '../../types/productTypes'

export default interface IProductInteractor {
  addProduct(data: ProductCreationDTO): Promise<ProductDTO | responseHandler>; // Ensure responseHandler is correctly spelled
  addBulkProduct(data: any): Promise<any>; // Ensure responseHandler is correctly spelled
  fetchByCategory(
    mainCategoryId: mongoose.Types.ObjectId | null, 
    subCategoryId: mongoose.Types.ObjectId | null
  ): Promise<ProductDTO[] | null>;
  
  getAllProducts(page:number,limit:number): Promise<ProductResponseDTO>;
  
  getAllListedProducts(page:number,limit:number): Promise<ProductResponseDTO>;
  
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

