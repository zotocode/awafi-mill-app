// src/presentation/controllers/ProductController.ts
import { Request, Response } from "express";
import { ProductInteractor } from "../../application/interactor/productInteractor";
import { ProductDTO } from "../../domain/dtos/ProductDTO";

export class ProductController {
  private productInteractor: ProductInteractor;

  constructor(productInteractor: ProductInteractor) {
    this.productInteractor = productInteractor;
  }

  // Add a new product (HTTP POST)
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
        console.log("product route is working")
      const productDTO: ProductDTO = req.body;
      await this.productInteractor.addProduct(productDTO)
      .then((response)=>{
        console.log("data respose",response)
      })
     
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      this.handleError(res, error, 400);
    }
  }

//   // Get all products (HTTP GET)
//   async getAllProducts(req: Request, res: Response): Promise<void> {
//     try {
//       const products = await this.productInteractor.getAllProducts();
//       res.status(200).json(products);
//     } catch (error) {
//       this.handleError(res, error, 500);
//     }
//   }

//   // Get a product by ID (HTTP GET)
//   async getProductById(req: Request, res: Response): Promise<void> {
//     try {
//       const productId: string = req.params.id;
//       const product = await this.productInteractor.getProductById(productId);
//       if (!product) {
//         res.status(404).json({ message: "Product not found" });
//       } else {
//         res.status(200).json(product);
//       }
//     } catch (error) {
//       this.handleError(res, error, 500);
//     }
//   }

//   // Update a product by ID (HTTP PUT)
//   async updateProduct(req: Request, res: Response): Promise<void> {
//     try {
//       const productId: string = req.params.id;
//       const productDTO: ProductDTO = req.body;
//       await this.productInteractor.updateProduct(productId, productDTO);
//       res.status(200).json({ message: "Product updated successfully" });
//     } catch (error) {
//       this.handleError(res, error, 400);
//     }
//   }

//   // Delete a product by ID (HTTP DELETE)
//   async deleteProduct(req: Request, res: Response): Promise<void> {
//     try {
//       const productId: string = req.params.id;
//       await this.productInteractor.deleteProduct(productId);
//       res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//       this.handleError(res, error, 500);
//     }
//   }

  // Helper method for handling errors with proper type checking
  private handleError(res: Response, error: unknown, statusCode: number): void {
    if (error instanceof Error) {
      res.status(statusCode).json({ error: error.message });
    } else {
      res.status(statusCode).json({ error: "An unknown error occurred" });
    }
  }
}
