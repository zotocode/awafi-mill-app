import { ProductDTO ,ProductCreationDTO} from "../../domain/dtos/ProductDTO"; 
import {listed} from '../../types/productTypes'
export default interface IProductInteractor {
  addProduct(data: ProductCreationDTO): Promise<ProductDTO>;
  getAllProducts(): Promise<ProductDTO[]>;
  getProductById(id: string): Promise<ProductDTO | null>;
  updateProduct(id: string, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null>;
  // deleteProduct(id: string): Promise<boolean>; 
  listById(id: string): Promise<listed | null>; 
  unListById(id: string): Promise<listed | null>; 
  updateImage(id:string,index:number,file:string):Promise<any>
}