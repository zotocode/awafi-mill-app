// src/infrastructure/repositories/productRepository.ts
import { ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import mongoose, { Model } from "mongoose";
import IProductSchema from "../../domain/entities/productSchema";
import { BaseRepository } from "./baseRepository";
import { IproductRepo } from '../../interface/productInterface/IproductRepo'
import {ProductResponse} from '../../types/productTypes'

type listing = {
  isListed: boolean
}
export class ProductRepository extends BaseRepository<IProductSchema> implements IproductRepo {
  constructor(model: Model<IProductSchema>) {
    super(model);
  }

  async addProduct(productDTO: ProductCreationDTO): Promise<IProductSchema> {
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
  async addBulkProduct(productData: any): Promise<any> {
    const productEntity = {
      ID:productData.ID,
      sku:productData.SKU,
      ean:productData.EAN,
      name: productData.Name,
      subCategory: productData.SubCategory,
      category: productData.MainCategory,
      descriptions: productData.Descriptions,
      images: productData.images,
      variants: productData.variants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await super.create(productEntity);

  }
  
  async findAllProducts(page:number,limit:number): Promise<ProductResponse> {
    const totalProducts = await this.model.countDocuments();
     const skip = (page - 1) * limit;
     const products =await this.model.find().skip(skip).limit(limit).populate('category').exec();
    return {products:products,totalPages: Math.ceil(totalProducts / limit)}

  }

  async findListedAllProducts(page:number,limit:number): Promise<ProductResponse> {
    const totalProducts = await this.model.countDocuments();
     const skip = (page - 1) * limit;
    const products= await this.model.find({ isListed: true, isDelete: false }).skip(skip).limit(limit).populate('category').exec();
    return {products:products,totalPages: Math.ceil(totalProducts / limit)}
  }

  async fetchByCategory(mainCategoryId?: mongoose.Types.ObjectId | null, subCategoryId?: mongoose.Types.ObjectId | null): Promise<IProductSchema[]> {
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

  async findByName(name: string): Promise<IProductSchema | null> {
    const regex = new RegExp(`^${name}$`, 'i');
    return await super.findOne({ name: regex });
  }
  async findByNameAndNotCurrentId(id: mongoose.Types.ObjectId, name: string): Promise<IProductSchema | null> {
    const regex = new RegExp(`^${name}$`, 'i');
    return await super.findOne({
      _id: { $ne: id },
      name: { $regex: regex }
    });

  }

  async productFindById(id: mongoose.Types.ObjectId): Promise<IProductSchema | null> {

    return await this.model.findById(id).populate('category').populate('subCategory').exec();
  }

  async isListedProduct(id: mongoose.Types.ObjectId): Promise<IProductSchema | null> {
    return await this.model.findOne({ _id: id, isListed: true }).exec();
  }

  async updateListing(id: mongoose.Types.ObjectId, UpdateQuery: listing): Promise<any | null> {
    return await this.model.updateOne({ _id: id }, UpdateQuery);
  }

  async updateImage(id: mongoose.Types.ObjectId, index: number, photo: string): Promise<any | null> {
    return await this.model.updateOne({ _id: id }, { $set: { [`images.${index}`]: photo } });
  }

  async updateVariantQuantity(productId: mongoose.Types.ObjectId, variantId: string, quantity: number): Promise<IProductSchema | null> {
    return await this.model.findOneAndUpdate(
      { _id: productId, 'variants._id': variantId }, // Find the product and the specific variant
      { $inc: { 'variants.$.stockQuantity': quantity } }, // Increment or decrement the stock quantity
      { new: true } // Return the updated product
    ).exec();
  }
  // Update in productRepository.ts

async updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<IProductSchema | null> {
  return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
}



  async deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
