import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion
import IsubCategoryInteractor from "../../interface/subCategoryInterface/IsubCategoryInteractory"; // Import the interface
import { subCategoryCreationDTo } from "../../domain/dtos/SubCategoryDTO"; 

export class SubCategoryController {
  private categoryInteractor: IsubCategoryInteractor; // Use the interface type

  constructor(categoryInteractor: IsubCategoryInteractor) {
    this.categoryInteractor = categoryInteractor;
  }

  // Add a new category (HTTP POST)
  async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category: subCategoryCreationDTo = req.body;
      const result: any = await this.categoryInteractor.addCategory(category);
      if (result?.status) {
        res.status(result.status).json({ message: result.message });
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Get all categories (HTTP GET)
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const categories = await this.categoryInteractor.getAllCategories(page,limit);
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getListedCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { Id } = req.params;
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      
      // Check if mainCategoryId is provided, and convert it to ObjectId
      if (!Id) {
         res.status(400).json({ message: "mainCategoryId is required" });
      }
  
      const categoryId = new mongoose.Types.ObjectId(Id as string);
  
      const products = await this.categoryInteractor.getListedCategories(categoryId,page,limit);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  

  // Get a category by ID (HTTP GET)
  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const product = await this.categoryInteractor.getCategoryById(productId);
      if (product) {
        res.status(200).json(product);
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
      const productId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const updatedData: Partial<subCategoryCreationDTo> = req.body; 
      const updatedProduct = await this.categoryInteractor.updateCategory(productId, updatedData);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Toggle listing status of a category (HTTP PUT)
  async toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { action } = req.query; // Action can be 'list' or 'unlist'
      if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }

      const productId = new mongoose.Types.ObjectId(id); // Convert string to ObjectId
      let product;
      if (action === 'list') {
        product = await this.categoryInteractor.listById(productId);
      } else if (action === 'unlist') {
        product = await this.categoryInteractor.unListById(productId);
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  // Delete a category (HTTP DELETE)
  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.id); // Convert string to ObjectId
      const deleted = await this.categoryInteractor.deleteCategory(productId);
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
