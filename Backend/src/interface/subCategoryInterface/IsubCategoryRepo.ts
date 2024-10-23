import mongoose from 'mongoose';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import IsubCategory from '../../domain/entities/subCategorySchema';
import { LargeDataFetch } from '../../types/commonTypes';

export default interface ICategoryRepo {
  addCategory(data: categoryCreationDTo): Promise<IsubCategory>;
  getAllCategories(page:number,limit:number): Promise<LargeDataFetch>;
  getListedCategories(mainCategoryId:mongoose.Types.ObjectId,page:number,limit:number): Promise<LargeDataFetch>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<IsubCategory | null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
  findByName(name: string): Promise<IsubCategory | null>;
  findByNameNotId(id:mongoose.Types.ObjectId,name: string): Promise<IsubCategory | null>
}
