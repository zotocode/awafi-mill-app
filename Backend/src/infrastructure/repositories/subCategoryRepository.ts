import { Model } from 'mongoose';
import { BaseRepository } from './baseRepository';
import IsubCategoryRepo from '../../interface/subCategoryInterface/IsubCategoryRepo';
import IsubCategory from '../../domain/entities/subCategorySchema';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO'; // Correct import for category DTO

export class SubCategoryRepository extends BaseRepository<IsubCategory> implements IsubCategoryRepo {
  constructor(model: Model<IsubCategory>) {
    super(model);
  }

  // Correct the DTO used in addCategory
  async addCategory(data: categoryCreationDTo): Promise<IsubCategory> {
    return await super.create(data);
  }

  async getAllCategories(): Promise<IsubCategory[]> {
    return await this.model.find({ isDeleted: false });
}

  async getListedCategories(mainCategoryId:string): Promise<IsubCategory[]> {
    return await this.model.find({isListed:true,isDeleted:false,mainCategory:mainCategoryId});
  }

  async findByName(name: string): Promise<IsubCategory | null> {
    const regex = new RegExp(`^${name}$`, 'i'); 
    return await super.findOne({ name: regex });
  }
  async findByNameNotId(id:string,name: string): Promise<IsubCategory | null> {
    const regex = new RegExp(`^${name}$`, 'i'); 
    return await super.findOne({
      _id: { $ne: id },  
      name: { $regex: regex }
    });
  }

  async getCategoryById(id: string): Promise<IsubCategory | null> {
    return await super.findById(id);
  }

  // Correct the DTO used in updateCategory
  async updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null> {
    return await super.update(id, data);
  }

  // Correct the return type to boolean
  async deleteCategory(id: string): Promise<boolean> {
    const result = await super.delete(id);
    return result !== null; // Assuming `super.delete` returns null when no document is found
  }
}
