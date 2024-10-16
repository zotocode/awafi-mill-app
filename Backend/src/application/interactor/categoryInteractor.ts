import IsubCategoryInteractory from "../../interface/categoryInterface/IcategoryInteractor";
import { resposeHandler } from "../../types/commonTypes";
import ICategoryRepo from "../../interface/categoryInterface/IcategoryRepo"; // Import your category repository interface
import {categoryCreationDTo,categoryDTo} from '../../domain/dtos/CategoryDTO'

export class CategoryInteractor implements IsubCategoryInteractory {
  private categoryRepo: ICategoryRepo; // Use the category repository

  constructor(categoryRepo: ICategoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  // Add a new category
  async addCategory(data: categoryCreationDTo): Promise<categoryDTo |resposeHandler> {
    // console.log("data",data)
    const{name}=data
    const isAvailable=await this.categoryRepo.findByName(name)
    if(isAvailable)
    {
      return { message: "Category always in your bucket", status: 409 };

    }
    const category = await this.categoryRepo.addCategory(data); // Use repository method

    return this.mapToDTO(category);
  }

  // Get all categories
  async getAllCategories(): Promise<categoryDTo[]> {
    const categories = await this.categoryRepo.getAllCategories(); // Use repository method
    return categories.map(this.mapToDTO);
  }

  // Get all listed categories
  async getListedCategories(): Promise<categoryDTo[]> {
    const categories = await this.categoryRepo.getListedCategories(); // Use repository method
    return categories.map(this.mapToDTO);
  }

  // Get a category by ID
  async getCategoryById(id: string): Promise<categoryDTo | null> {
    const category = await this.categoryRepo.getCategoryById(id); // Use repository method
    return category && !category.isDeleted ? this.mapToDTO(category) : null;
  }

  // Update a category
  async updateCategory(id: string, data: Partial<categoryCreationDTo>): Promise<categoryDTo | resposeHandler | null> {
    if(data.name)
    {
      const isAvailable=await this.categoryRepo.findByNameNotId(id,data.name)
      if(isAvailable)
      {
        return { message: "Category always in your bucket", status: 409 };
  
      }

    }
   
    const updatedCategory = await this.categoryRepo.updateCategory(id, data); // Use repository method
    return updatedCategory && !updatedCategory.isDeleted ? this.mapToDTO(updatedCategory) : null;
  }

  // Soft delete a category
  async deleteCategory(id: string): Promise<boolean> {
    return await this.categoryRepo.deleteCategory(id); // Use repository method
  }

  // List a category
  async listById(id: string): Promise<resposeHandler | null> {
    const category = await this.categoryRepo.getCategoryById(id); // Use repository method
    if (category && !category.isDeleted) {
      if (category.isListed) {
        throw new Error("Category is already listed.");
      }
      category.isListed = true; // List the category
      await this.categoryRepo.updateCategory(id, category); // Use repository method to update
      return { message: "Category listed successfully" };
    }
    throw new Error("Category not found.");
  }

  // Unlist a category
  async unListById(id: string): Promise<resposeHandler | null> {
    const category = await this.categoryRepo.getCategoryById(id); // Use repository method
    if (category && !category.isDeleted) {
      if (!category.isListed) {
        throw new Error("Category is already unlisted.");
      }
      category.isListed = false; // Unlist the category
      await this.categoryRepo.updateCategory(id, category); // Use repository method to update
      return { message: "Category unlisted successfully" };
    }
    throw new Error("Category not found.");
  }

  // Map Category to ProductDTO
  private mapToDTO(category: any): categoryDTo {
    return {
      _id: category._id.toString(),
      name: category.name,
      description: category.description,
      isListed: category.isListed,
      isDeleted: category.isDeleted,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
