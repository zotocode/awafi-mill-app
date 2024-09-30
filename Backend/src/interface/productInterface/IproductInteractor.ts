import { ProductDTO ,ProductCreationDTO} from "../../domain/dtos/ProductDTO"; 
export default interface IProductInteractor {
  addProduct(data: ProductCreationDTO): Promise<ProductDTO>;
  getAllProducts(): Promise<ProductDTO[]>;
  getProductById(id: string): Promise<ProductDTO | null>;
  updateProduct(id: string, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null>;
  // deleteProduct(id: string): Promise<boolean>; 
}