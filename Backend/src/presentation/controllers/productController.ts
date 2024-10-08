// src/presentation/controllers/ProductController.ts
import { NextFunction, Request, Response } from "express";
import IProductInteractor from "../../interface/productInterface/IproductInteractor"; // Import the interface
import { ProductCreationDTO } from "../../domain/dtos/ProductDTO"; 



export class ProductController {
  private productInteractor: IProductInteractor; // Use the interface type

  constructor(productInteractor: IProductInteractor) {
    this.productInteractor = productInteractor;
  }

  // Add a new product (HTTP POST)
  async addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const photos: any = req.files || [];
    
      const productData: ProductCreationDTO = req.body;
      
      if (photos.length > 0 && !productData.images) {
        productData.images = photos.map((photo: any[0]) => photo.path.toString());
    
      }
      
      const result:any = await this.productInteractor.addProduct(productData);
      if(result?.status)
        {
          res.status(result.status).json({ message: result.message});
        }
  
      res.status(201).json({ message: "Product created successfully", product: result });
    } catch (error) {
      next(error);
    }
  }
  // update single image----------------------------


  async updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract id and index from the query
      const { id, index } = req.query;
  
      if (!req.file) {
        throw new Error('Photo is not provided');
      }
  
      const { path } = req.file;
  
      // Ensure id is a string and index is a valid number
      if (typeof id !== 'string' || typeof index !== 'string') {
        throw new Error('Invalid id or index');
      }
  
      const currentIndex = parseInt(index, 10);
      if (isNaN(currentIndex)) {
        throw new Error('Index must be a valid number');
      }
  
      // Call your productInteractor to update the image
      const products = await this.productInteractor.updateImage(id, currentIndex, path);
  
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  

  // Get all products (HTTP GET)
  
  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
   
      const products = await this.productInteractor.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get a product by ID (HTTP GET)
  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productId = req.params.id;
      const product = await this.productInteractor.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // Update a product (HTTP PUT)
  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const productId = req.params.id;
      const updatedData: Partial<ProductCreationDTO> = req.body; 
      const updatedProduct:any = await this.productInteractor.updateProduct(productId, updatedData);
      if(updatedProduct?.status)
        {
          res.status(updatedProduct.status).json({ message: updatedProduct.message});
        }
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
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
  
      if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }
  
      let product;
      if (action === 'list') {
        product = await this.productInteractor.listById(id);
      } else if (action === 'unlist') {
        product = await this.productInteractor.unListById(id);
      }
  
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  


  // Delete a product (HTTP DELETE)
  // async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const productId = req.params.id;
  //     const deleted = await this.productInteractor.deleteProduct(productId);
  //     if (deleted) {
  //       res.status(200).json({ message: "Product deleted successfully" });
  //     } else {
  //       res.status(404).json({ message: "Product not found" });
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}