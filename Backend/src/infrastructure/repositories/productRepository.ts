import { ProductDTO, ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import { Model } from "mongoose";
import { Product } from "../../domain/entities/productSchema"; 
import { BaseRepository } from "./baseRepository";
import {IproductRepo} from '../../interface/productInterface/IproductRepo'

type listing={
  isListed:boolean
}
export class ProductRepository extends BaseRepository<Product> implements IproductRepo {
  constructor(model: Model<Product>) {
    super(model);
  }

  async addProduct(productDTO: ProductCreationDTO): Promise<Product> {
 
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

  async findAllProducts(): Promise<Product[]> {

      return await this.model.find().exec();
  
  }

  async findByName(name: string): Promise<Product | null> {
    const regex = new RegExp(`^${name}$`, 'i'); 
    return await super.findOne({ name: regex });
  }

  async productFindById(id: string): Promise<Product | null> {
 
      return await this.model.findById(id).exec();
  }
  async isListedProduct(id: string): Promise<Product | null> {
 
      return await this.model.findOne({_id:id,isListed:true}).exec();
  }

  async updateListing(id: string,UpdateQuery:listing): Promise<any | null> {
 
      return await this.model.updateOne({_id:id},UpdateQuery);
  }

  async updateImage(id:string,index:number,photo:string):Promise<any | null> 
  {
    return await this.model.updateOne({_id:id}, { $set: { [`images.${index}`]: photo } } );
  }

  async updateProduct(id: string, data: Partial<any>): Promise<ProductDTO | null> {

      return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
   
  }

  // async delete(id: string): Promise<boolean> {
  //   try {
  //     return await this.model.findByIdAndDelete(id).exec();
  //   } catch (error) {
  //     throw new error('An error occurred while deleting the product', 500);
  //   }
  // }
}
