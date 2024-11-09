import mongoose from "mongoose";
import { ProductCreationDTO, ProductDTO,Variant } from "../../domain/dtos/ProductDTO";
import Product from "../../domain/entities/productSchema";
import {ProductResponse} from '../../types/productTypes'

export interface IproductRepo {
  addProduct(productData: ProductCreationDTO): Promise<Product>;
  addBulkProduct(productData:any):Promise<void>
  updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO> | Variant): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByNameAndVariant(query:{name:string,weight:string}): Promise<boolean>;
  findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<Product | null>;
  findAllProducts(page:number,limit:number): Promise<ProductResponse>;
  findAllProductsInJsonWithAggregation(): Promise<ProductResponse>;
  findListedAllProducts(page:number,limit:number,userId?:mongoose.Types.ObjectId | null): Promise<ProductResponse>;
  findProductsBySpelling(page:number,limit:number,name:string): Promise<ProductResponse>;
  productFindById(id: mongoose.Types.ObjectId,userId?:mongoose.Types.ObjectId | null): Promise<Product | null>;
  fetchByCategoryAndName(page:number,limit:number,filter:any,userId?:mongoose.Types.ObjectId | null): Promise<ProductResponse>;
  listProductsBySubcategories(page:number,limit:number,mainCatId:mongoose.Types.ObjectId,userId?:mongoose.Types.ObjectId | null): Promise<ProductDTO[] | null>;
  updateImage(id: mongoose.Types.ObjectId, index: number, imageUrl: string): Promise<{ modifiedCount: number }>;
  deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean>;
  updateListing(id: mongoose.Types.ObjectId, data: { isListed: boolean }): Promise<{ modifiedCount: number }>;
  isListedProduct(id: mongoose.Types.ObjectId): Promise<Product | null>; // Change return type to boolean
}
