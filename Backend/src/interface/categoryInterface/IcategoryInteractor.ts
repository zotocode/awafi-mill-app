import {categoryCreationDTo,categoryDTo} from '../../domain/dtos/CategoryDTO'
import {resposeHandler} from '../../types/commonTypes'
export default interface ICategoryInteractor {
  addCategory(data: categoryCreationDTo): Promise<categoryDTo | resposeHandler>;
  getAllCategories(): Promise<categoryDTo[]>;
  getListedCategories(): Promise<categoryDTo[]>;
  getCategoryById(id: string): Promise<categoryDTo | null>;
  updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<categoryDTo | null |resposeHandler>;
  deleteCategory(id: string): Promise<boolean>; 
  listById(id: string): Promise<resposeHandler | null>; 
  unListById(id: string): Promise<resposeHandler | null>; 
  
}