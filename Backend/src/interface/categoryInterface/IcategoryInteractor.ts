import mongoose from 'mongoose';
import {categoryCreationDTo,categoryDTo} from '../../domain/dtos/CategoryDTO'
import {ListCategories, responseHandler} from '../../types/commonTypes'
import { LargeDataFetch } from '../../types/commonTypes';

export default interface ICategoryInteractor {
  addCategory(data: categoryCreationDTo): Promise<categoryDTo | responseHandler>;
  getAllCategories(page:number,limit:number): Promise<LargeDataFetch>;
  getByName(page:number,limit:number,name:string): Promise<LargeDataFetch>;
  getListedCategories(page:number,limit:number): Promise<LargeDataFetch>;
  getCategoryById(id: mongoose.Types.ObjectId): Promise<categoryDTo |null>;
  updateCategory(id: mongoose.Types.ObjectId, data: Partial<categoryCreationDTo>): Promise<categoryDTo | null |responseHandler>;
  deleteCategory(id: mongoose.Types.ObjectId): Promise<boolean>; 
  listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null>; 
  availblePrioritySlots(): Promise<{priorities:number[] |[]}>; 
  
}

