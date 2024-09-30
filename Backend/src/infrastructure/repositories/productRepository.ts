import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import { Model } from "mongoose";
import { Product } from "../../domain/entities/productSchema"; 
import { BaseRepository } from "./baseRepository";

export class ProductRepository extends BaseRepository<Product> {
  constructor(model: Model<Product>) {
    super(model);
  }

  async create(productDTO: ProductCreationDTO): Promise<Product> {
 
      const productEntity = {
        name: productDTO.name,
        description: productDTO.description,
        price: productDTO.price,
        originalPrice: productDTO.originalPrice,
        weight: productDTO.weight,
        stockStatus: {
          quantity: productDTO.stockQuantity,
          status: productDTO.status,
        },
        categories: productDTO.categories,
        images: productDTO.images,
        variants: productDTO.variants,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return await super.create(productEntity);
   
  }

  async findAll(): Promise<ProductDTO[]> {

      return await this.model.find().exec();
  
  }

  // async findById(id: string): Promise<ProductDTO | null> {
  //   try {
  //     return await this.model.findById(id).exec();
  //   } catch (error) {
  //     throw new error('An error occurred while retrieving product', 404);
  //   }
  // }

  // async update(id: string, data: Partial<any>): Promise<ProductDTO | null> {
  //   try {
  //     return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  //   } catch (error) {
  //     throw new error('An error occurred while updating the product', 500);
  //   }
  // }

  // async delete(id: string): Promise<boolean> {
  //   try {
  //     return await this.model.findByIdAndDelete(id).exec();
  //   } catch (error) {
  //     throw new error('An error occurred while deleting the product', 500);
  //   }
  // }
}
