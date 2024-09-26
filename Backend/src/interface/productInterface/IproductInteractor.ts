import { product } from "../../domain/entities/productSchema";
export default interface IProductInteractor {
  addProduct(data: product): Promise<any>;
  getAllProducts(): Promise<product[]>;
  getProductById(id: string): Promise<product | null>;
  updateProduct(id: string, data: Partial<product>): Promise<product | null>;
  deleteProduct(id: string): Promise<boolean>; 
}