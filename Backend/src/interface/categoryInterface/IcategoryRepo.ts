import mongoose from 'mongoose';
import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import ICategory from '../../domain/entities/categorySchema';

export default interface ICategoryRepo {
  addCategory(data: categoryCreationDTo): Promise<ICategory>;
  getAllCategories(): Promise<ICategory[]>;
  getListedCategories(): Promise<ICategory[]>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<ICategory | null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<ICategory | null>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>;
  findByName(name: string): Promise<ICategory | null>;
  findByNameNotId(id:mongoose.Types.ObjectId,name: string): Promise<ICategory | null>;
}

