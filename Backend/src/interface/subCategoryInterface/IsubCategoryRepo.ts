import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import IsubCategory from '../../domain/entities/subCategorySchema';

export default interface ICategoryRepo {
  addCategory(data: categoryCreationDTo): Promise<IsubCategory>;
  getAllCategories(): Promise<IsubCategory[]>;
  getListedCategories(mainCategoryId:string): Promise<IsubCategory[]>;
  getCategoryById(id: string): Promise<IsubCategory | null>;
  updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<IsubCategory | null>;
  deleteCategory(id: string): Promise<boolean>;
  findByName(name: string): Promise<IsubCategory | null>;
  findByNameNotId(id:string,name: string): Promise<IsubCategory | null>
}
