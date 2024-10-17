import mongoose from 'mongoose';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import IsubCategory from '../../domain/entities/subCategorySchema';

export default interface ICategoryRepo {
  addCategory(data: categoryCreationDTo): Promise<IsubCategory>;
  getAllCategories(): Promise<IsubCategory[]>;
  getListedCategories(mainCategoryId:mongoose.Types.ObjectId): Promise<IsubCategory[]>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<IsubCategory | null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
  findByName(name: string): Promise<IsubCategory | null>;
  findByNameNotId(id:mongoose.Types.ObjectId,name: string): Promise<IsubCategory | null>
}
