import mongoose from 'mongoose';
import {subCategoryCreationDTo,subCategoryDTo} from '../../domain/dtos/SubCategoryDTO'
import {responseHandler} from '../../types/commonTypes'
export default interface IsubCategoryInteractor {
  addCategory(data: subCategoryCreationDTo): Promise<subCategoryDTo | responseHandler>;
  getAllCategories(): Promise<subCategoryDTo[]>;
  getListedCategories(mainCategoryId:mongoose.Types.ObjectId ): Promise<subCategoryDTo[]>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<subCategoryDTo | null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<subCategoryCreationDTo>): Promise<subCategoryDTo | null |responseHandler>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>; 
  listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  
  
}

