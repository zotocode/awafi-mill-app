import mongoose from 'mongoose';
import {subCategoryCreationDTo,subCategoryDTo} from '../../domain/dtos/SubCategoryDTO'
import {LargeDataFetch, responseHandler} from '../../types/commonTypes'
export default interface IsubCategoryInteractor {
  addCategory(data: subCategoryCreationDTo): Promise<subCategoryDTo | responseHandler>;
  getAllCategories(limit:number,page:number): Promise<LargeDataFetch>;
  getListedCategories(mainCategoryId:mongoose.Types.ObjectId,page:number,limit:number ): Promise<LargeDataFetch>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<subCategoryDTo | null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<subCategoryCreationDTo>): Promise<subCategoryDTo | null |responseHandler>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>; 
  listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  
  
}

