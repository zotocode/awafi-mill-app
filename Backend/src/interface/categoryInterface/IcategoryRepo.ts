import { categoryCreationDTo } from '../../domain/dtos/CategoryDTO';
import ICategory from '../../domain/entities/categorySchema';

export default interface ICategoryRepo {
  addCategory(data: categoryCreationDTo): Promise<ICategory>;
  getAllCategories(): Promise<ICategory[]>;
  getListedCategories(): Promise<ICategory[]>;
  getCategoryById(id: string): Promise<ICategory | null>;
  updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<ICategory | null>;
  deleteCategory(id: string): Promise<boolean>;
  findByName(name: string): Promise<ICategory | null>;
  findByNameNotId(id:string,name: string): Promise<ICategory | null>;
}
