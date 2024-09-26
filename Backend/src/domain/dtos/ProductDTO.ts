// src/domain/dtos/ProductDTO.ts
import mongoose from 'mongoose';
import { Product } from '../entities/Product';



export class ProductDTO {
    constructor(
      public _id: string |mongoose.Types.ObjectId,
      public title: string,
      public description: string,
      public price: number,
      public inventory: number,
      public createdAt: Date = new Date(), // Default value if not provided
      public updatedAt: Date = new Date()  // Default value if not provided
    ) {}

    // Static method to map from entity to DTO
    static fromEntity(product: Product): ProductDTO {
      return new ProductDTO(
        product._id,
        product.title,
        product.description,
        product.price,
        product.inventory,
        product.createdAt,
        product.updatedAt
      );
    }

    // Static method to map from DTO to entity with validation
    static toEntity(dto: ProductDTO): Product {
      if (dto.price <= 0) {
        throw new Error("Price must be greater than zero");
      }
      if (dto.inventory < 0) {
        throw new Error("Inventory cannot be negative");
      }
      return new Product(
        dto._id,
        dto.title,
        dto.description,
        dto.price,
        dto.inventory,
        dto.createdAt,
        dto.updatedAt
      );
    }
}
