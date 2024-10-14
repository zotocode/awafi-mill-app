import { ProductDTO ,ProductCreationDTO} from "../../domain/dtos/ProductDTO"; 
import {resposeHandler} from '../../types/commonTypes'
export default interface IProductInteractor {
  addProduct(data: ProductCreationDTO): Promise<ProductDTO |resposeHandler>;
  getAllProducts(): Promise<ProductDTO[]>;
  getProductById(id: string): Promise<ProductDTO | null>;
  updateProduct(id: string, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null |resposeHandler>;
  deleteProduct(id: string): Promise<boolean>; 
  listById(id: string): Promise<resposeHandler | null>; 
  unListById(id: string): Promise<resposeHandler | null>; 
  updateImage(id:string,index:number,file:string):Promise<any>
}