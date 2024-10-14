import {subCategoryCreationDTo,subCategoryDTo} from '../../domain/dtos/SubCategoryDTO'
import {resposeHandler} from '../../types/commonTypes'
export default interface IsubCategoryInteractor {
  addCategory(data: subCategoryCreationDTo): Promise<subCategoryDTo | resposeHandler>;
  getAllCategories(): Promise<subCategoryDTo[]>;
  getListedCategories(mainCategoryId:string): Promise<subCategoryDTo[]>;
  getCategoryById(id: string): Promise<subCategoryDTo | null>;
  updateCategory(id: string, data: Partial<subCategoryCreationDTo>): Promise<subCategoryDTo | null |resposeHandler>;
  deleteCategory(id: string): Promise<boolean>; 
  listById(id: string): Promise<resposeHandler | null>; 
  unListById(id: string): Promise<resposeHandler | null>; 
  
}