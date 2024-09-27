import { Product } from "../../interface/productInterface/IproductRepo"; 
import { ProductDTO } from "../../domain/dtos/ProductDTO";
import { Model } from "mongoose";
import { IProduct } from "../../domain/entities/productSchema"; 
import { BaseRepository } from "./baseRepository";

// Ensure IProduct & Document is used correctly
export class ProductRepository extends BaseRepository<IProduct> {
  constructor(model: Model<IProduct>) {
    super(model);
  }

  async create(product: Product): Promise<IProduct> {
    const productEntity = ProductDTO.toEntity(ProductDTO.fromEntity(product));
    return await super.create(productEntity);
  }

  async findAll(): Promise<IProduct[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<IProduct | null> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IProduct | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  

  private mapToDomain(productDoc: IProduct): Product {
    return new Product(
      productDoc._id,
      productDoc.title,
      productDoc.description,
      productDoc.price,
      productDoc.inventory,
      productDoc.createdAt,
      productDoc.updatedAt
    );
  }
}
