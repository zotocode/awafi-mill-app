import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"; // Add mongoose for ObjectId
import ICategoryInteractor from "../../interface/categoryInterface/IcategoryInteractor"; // Import the interface
import { categoryCreationDTo } from "../../domain/dtos/CategoryDTO"; 

export class CategoryController {
  private categoryInteractor: ICategoryInteractor; // Use the interface type

  constructor(categoryInteractor: ICategoryInteractor) {
    this.categoryInteractor = categoryInteractor;
  }

  // Add a new category (HTTP POST)
  async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category: categoryCreationDTo = req.body;
      const result: any = await this.categoryInteractor.addCategory(category);

      if (result?.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  // Get all categories (HTTP GET)
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const products = await this.categoryInteractor.getAllCategories(page,limit);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get listed categories (HTTP GET)
  async getListedCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.categoryInteractor.getListedCategories();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get a category by ID (HTTP GET)
  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const category = await this.categoryInteractor.getCategoryById(categoryId);

      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Update a category (HTTP PUT)
  async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const updatedData: Partial<categoryCreationDTo> = req.body;
      const updatedCategory = await this.categoryInteractor.updateCategory(categoryId, updatedData);

      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Toggle list status of a category (HTTP PUT)
  async toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { action } = req.query;

      if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }

      const categoryId = new mongoose.Types.ObjectId(id); // Convert string to ObjectId
      let category;

      if (action === 'list') {
        category = await this.categoryInteractor.listById(categoryId);
      } else if (action === 'unlist') {
        category = await this.categoryInteractor.unListById(categoryId);
      }

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  // Delete a category (HTTP DELETE)
  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const deleted = await this.categoryInteractor.deleteCategory(categoryId);

      if (deleted) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
