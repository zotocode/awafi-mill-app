import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import { Product } from "../../domain/entities/productSchema";
import { error } from "console";
// import IDHandler from "../services/hashIdServices";



export class ProductInteractor implements IProductInteractor {
  private productRepo: ProductRepository;


  constructor(productRepo: ProductRepository) {
    this.productRepo = productRepo;
  
  }

  // Adding a new product
  async addProduct(productData: ProductCreationDTO): Promise<ProductDTO> {
    
    if (productData.price <= 0) {
      throw  error('Price must be greater than zero');
    }

    const createdProduct = await this.productRepo.create(productData);
    return this.mapEntityToDto(createdProduct);
  }

  // Retrieve all products
  async getAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productRepo.findAll();
    return products.map((p) => this.mapEntityToDto(p as any));
  }

  // Retrieve a product by ID
  async getProductById(id: string): Promise<ProductDTO | null> {

    const product = await this.productRepo.pFindById(id);
    return product ? this.mapEntityToDto(product) : null;
  }

  // Update a product by ID
  async updateProduct(id: string, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null> {
  
    const updatedProduct = await this.productRepo.update(id, data);
    return updatedProduct ? this.mapEntityToDto(updatedProduct) : null;
  }

  // Delete a product by ID
  // async deleteProduct(id: string): Promise<boolean> {
  //   const deletedProduct = await this.productRepo.delete(id);
  //   return !!deletedProduct;
  // }

  private mapDtoToEntity(productData: ProductDTO): Product {
    if (!productData.name || !productData.description || !productData.price) {
      throw error('Required fields are missing in ProductDTO');
    }
  
    const stockStatus = {
      quantity: productData.stockStatus.quantity,
      status: productData.stockStatus.status,
    };
  
    return {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice,
      weight: productData.weight,
      stockStatus: stockStatus,
      categories: productData.categories,
      images: productData.images,
      variants: productData.variants,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Product;
  }
  

  // Mapping Product entity to DTO
  private mapEntityToDto(product: Product): ProductDTO {
  
    return {
      _id: product._id, // Use the hashed ID here
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      weight: product.weight,
      stockStatus: product.stockStatus,
      categories: product.categories,
      images: product.images,
      variants: product.variants,
    };
  }
  
}
