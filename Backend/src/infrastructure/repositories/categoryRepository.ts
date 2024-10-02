// src/infrastructure/repositories/CategoryRepository.ts
import { Document, Model } from 'mongoose';
import {BaseRepository} from './baseRepository';
import ICategoryRepo from '../../interface/categoryInterface/IcategoryRepo';
import Category from '../../domain/entities/categorySchema';
import { ProductCreationDTO } from '../../domain/dtos/ProductDTO';


export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepo {
    constructor(model: Model<Category>) {
        super(model);
      }

  async addCategory(data: ProductCreationDTO): Promise<Category> {
    return await super.create(data);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.model.find();
  }

  async findByName(name: string): Promise<Category | null> {
    const regex = new RegExp(`^${name}$`, 'i'); 
    return await super.findOne({ name: regex });
  }
  

  async getCategoryById(id: string): Promise<Category | null> {
    return await super.findById(id);
  }

  async updateCategory(id: string, data: Partial<ProductCreationDTO>): Promise<Category | null> {
    return await super.update(id, data);
  }

  async deleteCategory(id: string): Promise<any> {
    return await super.delete(id);
  }
}
