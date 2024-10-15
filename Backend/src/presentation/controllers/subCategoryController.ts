// src/presentation/controllers/ProductController.ts
import { NextFunction, Request, Response } from "express";
import IsubCategoryInteractor from "../../interface/subCategoryInterface/IsubCategoryInteractory"; // Import the interface
import { subCategoryCreationDTo} from "../../domain/dtos/SubCategoryDTO"; 



export class SubCategoryController {
  private categoryInteractor: IsubCategoryInteractor; // Use the interface type

  constructor(categoryInteractor: IsubCategoryInteractor) {
    this.categoryInteractor = categoryInteractor;
  }

  // Add a new product (HTTP POST)
  async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    
      const category: subCategoryCreationDTo = req.body;
      //  console.log('data set',req.bodycod
    
      const result:any = await this.categoryInteractor.addCategory(category);
      if(result?.status)
      {
        res.status(result.status).json({ message: result.message});
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }


  // Get all categories (HTTP GET)
  
  async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const products = await this.categoryInteractor.getAllCategories();
        
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

  async getListedCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       const {mainCategory}=req.query

      const products = await this.categoryInteractor.getListedCategories(mainCategory as string);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get a product by ID (HTTP GET)
  async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = req.params.id;
      const product = await this.categoryInteractor.getCategoryById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "category not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Update a product (HTTP PUT)
  async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const productId = req.params.id;
      const updatedData: Partial<subCategoryCreationDTo> = req.body; 
      const updatedProduct = await this.categoryInteractor.updateCategory(productId, updatedData);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "category not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // list  product---------------------------------
  
  async toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { action } = req.query; // action can be 'list' or 'unlist'
     console.log('is working',req.query)
      if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }
  
      let product;
      if (action === 'list') {
        product = await this.categoryInteractor.listById(id);
      } else if (action === 'unlist') {
        product = await this.categoryInteractor.unListById(id);
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  


//   Delete a product (HTTP DELETE)
  async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = req.params.id;
      const deleted = await this.categoryInteractor.deleteCategory(productId);
      if (deleted) {
        res.status(200).json({ message: "category deleted successfully" });
      } else {
        res.status(404).json({ message: "category not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}

