import { ProductDTO } from "../../domain/dtos/ProductDTO";
import { ProductRepository } from "../../infrastrucutre/repositories/productRepository";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import { IProduct, product } from '../../domain/entities/productSchema'; 
import { Product } from "../../interface/productInterface/IproductRepo"; 

export class ProductInteractor implements IProductInteractor {
  private productRepo: ProductRepository;

  constructor(productRepo: ProductRepository) {
    this.productRepo = productRepo;
  }

  async addProduct(productData: product): Promise<ProductDTO> {
    const product = ProductDTO.toEntity(productData);
    if (product.price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    const createdProduct = await this.productRepo.create(product);
    return ProductDTO.fromEntity(this.mapToProduct(createdProduct));
  }

  async getAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productRepo.findAll();
    return products.map(p => ProductDTO.fromEntity(this.mapToProduct(p)));
  }

  async getProductById(id: string): Promise<ProductDTO | null> {
    const product = await this.productRepo.findById(id);
    return product ? ProductDTO.fromEntity(this.mapToProduct(product)) : null;
  }

  async updateProduct(id: string, data: Partial<product>): Promise<ProductDTO | null> {
    const updatedProduct = await this.productRepo.update(id, data);
    return updatedProduct ? ProductDTO.fromEntity(this.mapToProduct(updatedProduct)) : null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deletedProduct = await this.productRepo.delete(id);
    return !!deletedProduct; // Returns true if deleted, false if not found
  }
  

  private mapToProduct(iProduct: IProduct): Product {
    return new Product(
      iProduct._id,
      iProduct.title,
      iProduct.description,
      iProduct.price,
      iProduct.inventory,
      iProduct.createdAt,
      iProduct.updatedAt
    );
  }
}