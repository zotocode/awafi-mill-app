import { NextFunction, Request, Response } from "express";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import { ProductCreationDTO } from "../../domain/dtos/ProductDTO";
import mongoose from "mongoose";

<<<<<<< HEAD
export class ProductController {
=======
export class ProductController  {
>>>>>>> upstream/develop
  private productInteractor: IProductInteractor;

  constructor(productInteractor: IProductInteractor) {
    this.productInteractor = productInteractor;
  }

  // Add a new product (HTTP POST)
  async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const photos: any = req.files || [];
      const productData: ProductCreationDTO = req.body;

      if (photos.length > 0 && !productData.images) {
<<<<<<< HEAD
        productData.images = photos.map((photo: any[0]) => photo.path.toString());
      }
   
=======
        productData.images = photos.map((photo: any[0]) =>
          photo.path.toString()
        );
      }

>>>>>>> upstream/develop
      const result: any = await this.productInteractor.addProduct(productData);
      if (result?.status) {
        res.status(result.status).json({ message: result.message });
      } else {
<<<<<<< HEAD
        res.status(200).json({ message: "Product created successfully", product: result });
      }
    } catch (error) {
      next(error);
    }
  }
  async bulkAdding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: any = req.file || [];
      const result: any = await this.productInteractor.addBulkProduct(productData);
      if (result?.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res.status(200).json({ message: "Product created successfully", product: result });
=======
        res
          .status(200)
          .json({ message: "Product created successfully", product: result });
>>>>>>> upstream/develop
      }
    } catch (error) {
      next(error);
    }
  }
<<<<<<< HEAD

  // Update single image
  async updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
=======
  async bulkAdding(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productData: any = req.file || [];
      const result: any = await this.productInteractor.addBulkProduct(
        productData
      );
      if (result?.status) {
        res.status(result.status).json({ message: result.message });
      } else {
        res
          .status(200)
          .json({ message: "Product created successfully", product: result });
      }
    } catch (error) {
      next(error);
    }
  }
  async bulkDownload(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // const page = req.query.page ? Number(req.query.page) : 1;
      // const limit = req.query.limit ? Number(req.query.limit) : 10;
      const products = await this.productInteractor.bulkDownload();
      if (products) {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
        res.send(products);
      }
    } catch (error) {
      next(error);
    }
  }

  // Update single image
  async updateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
>>>>>>> upstream/develop
      const { productId, index } = req.query;

      if (!req.file) {
        throw new Error("Photo is not provided");
      }

      const { path } = req.file;

<<<<<<< HEAD
      if (typeof productId !== 'string' || typeof index !== 'string') {
        throw new Error('Invalid productId or index');
=======
      if (typeof productId !== "string" || typeof index !== "string") {
        throw new Error("Invalid productId or index");
>>>>>>> upstream/develop
      }

      const currentIndex = parseInt(index, 10);
      if (isNaN(currentIndex)) {
        throw new Error("Index must be a valid number");
      }

      const productObjectId = new mongoose.Types.ObjectId(productId);

<<<<<<< HEAD
      const products = await this.productInteractor.updateImage(productObjectId, currentIndex, path);
=======
      const products = await this.productInteractor.updateImage(
        productObjectId,
        currentIndex,
        path
      );
>>>>>>> upstream/develop
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get all products (HTTP GET)
<<<<<<< HEAD
  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const products = await this.productInteractor.getAllProducts(page,limit);
=======
  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const products = await this.productInteractor.getAllProducts(page, limit);
>>>>>>> upstream/develop
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Get all listed products (HTTP GET)
<<<<<<< HEAD
  async getAllListedProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const products = await this.productInteractor.getAllListedProducts(page,limit);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async SearchByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const {name}=req.body

      const products = await this.productInteractor.SearchByName(page,limit,name);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Fetch products by category
  async FilterProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { mainCategoryId, subCategoryId } = req.query;
      const MainCategoryId = mainCategoryId ? new mongoose.Types.ObjectId(mainCategoryId as string) : null;
      const SubCategoryId = subCategoryId ? new mongoose.Types.ObjectId(subCategoryId as string) : null;

      const products = await this.productInteractor.fetchByCategory(MainCategoryId, SubCategoryId);
=======
  async getAllListedProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const products = await this.productInteractor.getAllListedProducts(
        page,
        limit
      );
>>>>>>> upstream/develop
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async SearchByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
<<<<<<< HEAD
=======
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const name = req.query.searchName ? req.query.searchName.toString() : '';
      

      const products = await this.productInteractor.SearchByName(
        page,
        limit,
        name
      );
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // Fetch products by category
  async FilterProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
     
      const { mainCategoryId, subCategoryId,name } = req.body;
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const MainCategoryId = mainCategoryId
        ? new mongoose.Types.ObjectId(mainCategoryId as string)
        : null;
      const SubCategoryId = subCategoryId
        ? new mongoose.Types.ObjectId(subCategoryId as string)
        : null;
        const prodctname= name ? name as string:null
        const filter={
          MainCategoryId,
          SubCategoryId,
          prodctname
        }

      const products = await this.productInteractor.fetchByCategoryAndName(
       page,limit,filter
      );
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  // Fetching products under subcategory using main category id
  async listProductsBySubcategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { mainCatId } = req.params;
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
  
      if (!mainCatId) {
         res.status(400).json({ error: "Main category ID is required" });
      }
  
      const MainCategoryId = new mongoose.Types.ObjectId(mainCatId as string);
  
      const products = await this.productInteractor.listProductsBySubcategories(
        page,
        limit,
        MainCategoryId
      );
      
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  

  // Get a product by ID (HTTP GET)
  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
>>>>>>> upstream/develop
      const productId = new mongoose.Types.ObjectId(req.params.id);
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
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.id);
      const updatedData: Partial<ProductCreationDTO> = req.body;
<<<<<<< HEAD
      const updatedProduct: any = await this.productInteractor.updateProduct(productId, updatedData);

      if (updatedProduct?.status) {
        res.status(updatedProduct.status).json({ message: updatedProduct.message });
=======
      const updatedProduct: any = await this.productInteractor.updateProduct(
        productId,
        updatedData
      );

      if (updatedProduct?.status) {
        res
          .status(updatedProduct.status)
          .json({ message: updatedProduct.message });
>>>>>>> upstream/develop
      } else if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // List or unlist a product
<<<<<<< HEAD
  async toggleListStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
=======
  async toggleListStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
>>>>>>> upstream/develop
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const { action } = req.query; // action can be 'list' or 'unlist'

<<<<<<< HEAD
      if (typeof action !== 'string' || (action !== 'list' && action !== 'unlist')) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }

=======
      if (
        typeof action !== "string" ||
        (action !== "list" && action !== "unlist")
      ) {
        throw new Error('Invalid action. Expected "list" or "unlist".');
      }
>>>>>>> upstream/develop
      let product;
      if (action === "list") {
        product = await this.productInteractor.listById(id);
      } else if (action === "unlist") {
        product = await this.productInteractor.unListById(id);
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  // Delete a product (HTTP DELETE)
  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = new mongoose.Types.ObjectId(req.params.id);
      const deleted = await this.productInteractor.deleteProduct(productId);

      if (deleted) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      next(error);
    }
  }
}
