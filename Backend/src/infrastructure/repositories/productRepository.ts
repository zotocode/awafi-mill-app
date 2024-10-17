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

  async findListedAllProducts(): Promise<Product[]> {
    return await this.model.find({ isListed: true, isDelete: false }).populate('category').exec();
  }

  async fetchByCategory(mainCategoryId?: mongoose.Types.ObjectId | null, subCategoryId?: mongoose.Types.ObjectId | null): Promise<Product[]> {
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
  async findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<Product | null> {
    const regex = new RegExp(`^${name}$`, 'i');
    return await super.findOne({
      _id: { $ne: id },
      name: { $regex: regex }
    });

  }

  async productFindById(id: mongoose.Types.ObjectId): Promise<Product | null> {

    return await this.model.findById(id).populate('category').populate('subCategory').exec();
  }

  async isListedProduct(id: mongoose.Types.ObjectId): Promise<Product | null> {
    return await this.model.findOne({ _id: id, isListed: true }).exec();
  }

  async updateListing(id: mongoose.Types.ObjectId, UpdateQuery: listing): Promise<any | null> {
    return await this.model.updateOne({ _id: id }, UpdateQuery);
  }

  async updateImage(id: mongoose.Types.ObjectId, index: number, photo: string): Promise<any | null> {
    return await this.model.updateOne({ _id: id }, { $set: { [`images.${index}`]: photo } });
  }

  async updateVariantQuantity(productId: mongoose.Types.ObjectId, variantId: string, quantity: number): Promise<Product | null> {
    return await this.model.findOneAndUpdate(
      { _id: productId, 'variants._id': variantId }, // Find the product and the specific variant
      { $inc: { 'variants.$.stockQuantity': quantity } }, // Increment or decrement the stock quantity
      { new: true } // Return the updated product
    ).exec();
  }
  // Update in productRepository.ts

async updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<Product | null> {
  return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
}



  async deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
