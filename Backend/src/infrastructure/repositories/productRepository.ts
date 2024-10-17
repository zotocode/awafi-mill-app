// src/infrastructure/repositories/productRepository.ts
import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import mongoose, { Model } from "mongoose";
import Product from "../../domain/entities/productSchema";
import { BaseRepository } from "./baseRepository";
import { IproductRepo } from '../../interface/productInterface/IproductRepo'

type listing = {
  isListed: boolean
}
export class ProductRepository extends BaseRepository<Product> implements IproductRepo {
  constructor(model: Model<Product>) {
    super(model);
  }

  async addProduct(productDTO: ProductCreationDTO): Promise<Product> {

    const productEntity = {
      name: productDTO.name,
      subCategory: productDTO.subCategory,
      category: productDTO.category,
      descriptions: productDTO.descriptions,
      images: productDTO.images,
      variants: productDTO.variants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await super.create(productEntity);

  }

  async findAllProducts(): Promise<Product[]> {

    return await this.model.find().populate('category').exec();

  }
  async fetchByCategory(mainCategoryId?: string, subCategoryId?: string): Promise<Product[]> {
    const filter: any = {};

    if (mainCategoryId) {
      filter.category = mainCategoryId;
    }
    if (subCategoryId) {
      filter.subCategory = subCategoryId;
    }


    // Fetch products with the filter, or all products if no IDs are provided
    return await this.model.find(filter).exec();
  }

  async findByName(name: string): Promise<Product | null> {
    const regex = new RegExp(`^${name}$`, 'i');
    return await super.findOne({ name: regex });
  }
  async findByNameAndNotCurrentId(id: string, name: string): Promise<Product | null> {
    const regex = new RegExp(`^${name}$`, 'i');
    return await super.findOne({
      _id: { $ne: id },
      name: { $regex: regex }
    });

  }

  async productFindById(id: mongoose.Schema.Types.ObjectId): Promise<Product | null> {

    return await this.model.findById(id).populate('category').exec();
  }
  async isListedProduct(id: string): Promise<Product | null> {

    return await this.model.findOne({ _id: id, isListed: true }).exec();
  }

  async updateListing(id: string, UpdateQuery: listing): Promise<any | null> {

    return await this.model.updateOne({ _id: id }, UpdateQuery);
  }

  async updateImage(id: string, index: number, photo: string): Promise<any | null> {
    return await this.model.updateOne({ _id: id }, { $set: { [`images.${index}`]: photo } });
  }

  async updateProduct(id: string, data: Partial<any>): Promise<Product | null> {

    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();

  }
  
  async updateVariantQuantity(productId: string, variantId: string, quantity: number): Promise<Product | null> {
    return await this.model.findOneAndUpdate(
      { _id: productId, 'variants._id': variantId }, // Find the product and the specific variant
      { $inc: { 'variants.$.stockQuantity': quantity } }, // Increment or decrement the stock quantity
      { new: true } // Return the updated product
    ).exec();
  }


  // async delete(id: string): Promise<boolean> {
  //   try {
  //     return await this.model.findByIdAndDelete(id).exec();
  //   } catch (error) {
  //     throw new error('An error occurred while deleting the product', 500);
  //   }
  // }
}
