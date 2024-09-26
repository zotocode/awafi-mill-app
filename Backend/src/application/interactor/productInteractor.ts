import { ProductDTO } from "../../domain/dtos/ProductDTO";
import { ProductRepository } from "../../infrastrucutre/repositories/productRepository";


export class ProductInteractor {
    private productRepo: ProductRepository;
  
    constructor(productRepo: ProductRepository) {
      this.productRepo = productRepo;
    }
  
    // Use case for adding a new product
    async addProduct(productDTO: ProductDTO): Promise<ProductDTO> {
      // Convert DTO to domain entity
      const product = ProductDTO.toEntity(productDTO);
  
      // Apply some business logic (e.g., validate price)
      if (product.price <= 0) {
        throw new Error("Price must be greater than zero");
      }
  
      // Save the product using the repository
      return await this.productRepo.create(product);
    }
  
    // // Get all products
    // async getAllProducts(): Promise<ProductDTO[]> {
    //   const products = await this.productRepo.findAll();
      
    //   // Map products to DTOs
    //   return products.map(ProductDTO.fromEntity);
    // }
  
    // // Get a single product by ID
    // async getProductById(id: string): Promise<ProductDTO | null> {
    //   const product = await this.productRepo.findById(id);
    //   if (!product) return null;
  
    //   return ProductDTO.fromEntity(product);
    // }
  
    // // Update a product by ID
    // async updateProduct(id: string, productDTO: ProductDTO): Promise<void> {
    //   const product = ProductDTO.toEntity(productDTO);
    //   await this.productRepo.update(id, product);
    // }
  
    // // Delete a product by ID
    // async deleteProduct(id: string): Promise<void> {
    //   await this.productRepo.delete(id);
    // }
  }
