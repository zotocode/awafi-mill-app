import { Model } from 'mongoose';
import { BaseRepository } from './baseRepository';
import ICategoryRepo from '../../interface/categoryInterface/IcategoryRepo';
import ICategory from '../../domain/entities/categorySchema';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO'; // Correct import for category DTO

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepo {
  constructor(model: Model<ICategory>) {
    super(model);
  }

  // Correct the DTO used in addCategory
  async addCategory(data: categoryCreationDTo): Promise<ICategory> {
    return await super.create(data);
  }

  async getAllCategories(): Promise<ICategory[]> {
    return await this.model.find({isDeleted:false});
  }
  async getListedCategories(): Promise<ICategory[]> {
    return await this.model.find({isListed:true,isDeleted:false});
  }

  async findByName(name: string): Promise<ICategory | null> {
    const regex = new RegExp(`^${name}$`, 'i'); 
    return await super.findOne({ name: regex });
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await super.findById(id);
  }

  // Correct the DTO used in updateCategory
  async updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<ICategory | null> {
    return await super.update(id, data);
  }

  // Correct the return type to boolean
  async deleteCategory(id: string): Promise<boolean> {
    const result = await super.delete(id);
    return result !== null; // Assuming `super.delete` returns null when no document is found
  }
}
