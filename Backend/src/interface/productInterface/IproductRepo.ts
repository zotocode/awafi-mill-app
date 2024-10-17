import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import Product from "../../domain/entities/productSchema";

export interface IproductRepo {
  addProduct(productData: ProductCreationDTO): Promise<Product>;
  update(id: string, data: Partial<ProductCreationDTO>): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByNameAndNotCurrentId(id: string, name: string): Promise<Product | null>;
  findAllProducts(): Promise<Product[]>;
  findListedAllProducts(): Promise<Product[]>;
  productFindById(id: string): Promise<Product | null>;
  fetchByCategory(mainCategoryId: string, subCategoryId: string): Promise<ProductDTO[] | null>;
  updateImage(id: string, index: number, imageUrl: string): Promise<{ modifiedCount: number }>;
  deleteProduct(id: string): Promise<boolean>;
  updateListing(id: string, data: { isListed: boolean }): Promise<{ modifiedCount: number }>;
  isListedProduct(id: string): Promise<Product |null>;
}
