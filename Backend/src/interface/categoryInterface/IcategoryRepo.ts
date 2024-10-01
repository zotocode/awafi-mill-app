import {categoryCreationDTo} from '../../domain/dtos/CategoryDTO'

export default interface ICategoryRepo {
    addCategory(data: categoryCreationDTo): Promise<any>; // Return type can be adjusted as needed
    getAllCategories(): Promise<any[]>; // Return type can be adjusted as needed
    getCategoryById(id: string): Promise<any | null>; // Return type can be adjusted as needed
    updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<any | null>; // Return type can be adjusted as needed
    deleteCategory(id: string): Promise<boolean>; // Return type can be adjusted as needed
    findByName(name:string):Promise<any>
  }
  