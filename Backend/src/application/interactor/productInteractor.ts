import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import Product from "../../domain/entities/productSchema";
import { responseHandler } from '../../types/commonTypes'; // Corrected spelling
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
import { IproductRepo } from "../../interface/productInterface/IproductRepo";
import mongoose from "mongoose";
import { IExcel } from "../../interface/serviceInterface/IexcelInterface";
import {ProductResponseDTO} from "../../types/productTypes"
import ICategoryRepo from "../../interface/categoryInterface/IcategoryRepo";
import ISubCategoryRepo from "../../interface/subCategoryInterface/IsubCategoryRepo";

export class ProductInteractor implements IProductInteractor {
  private productRepo: IproductRepo;
  private cloudinaryService: ICloudinaryService;
  private excelService:IExcel;
  private categoryRepo:ICategoryRepo;
  private subCategoryRepo:ISubCategoryRepo;

  constructor(productRepo: IproductRepo, cloudinaryService: ICloudinaryService,excelService:IExcel,categoryRepo:ICategoryRepo,subCategoryRepo:ISubCategoryRepo) {
    this.productRepo = productRepo;
    this.cloudinaryService = cloudinaryService;
    this.excelService=excelService
    this.categoryRepo=categoryRepo
    this.subCategoryRepo=subCategoryRepo

  }

  // Adding a new product
  async addProduct(productData: ProductCreationDTO): Promise<ProductDTO | responseHandler> {
    const uploadedImages = await Promise.all(
      productData.images.map(async (path) => {
        const uploadResult = await this.cloudinaryService.uploadProductImage(path);
        return uploadResult.secure_url; // Return the Cloudinary URL
      })
    );

    productData.images = uploadedImages;

    const { name } = productData;
    const isAvailable = await this.productRepo.findByName(name);
    if (isAvailable) {
      return { message: "Product is already in your bucket", status: 409 };
    }

    const createdProduct = await this.productRepo.addProduct(productData);
    return this.mapEntityToDto(createdProduct);
  }

  async addBulkProduct(productData: any): Promise<any> {
    try {
      const sheetData = await this.excelService.processExcel(productData.path);
  
      if (sheetData && Array.isArray(sheetData)) {
        const addBulkProducts = sheetData.map(async (element) => {
          if (element.Name) {
            // Check if the product with the same name already exists
            const isExist = await this.productRepo.findByName(element.Name);
            if (isExist) {
              // Instead of throwing an error, return a failure message
              return { status: 'failed', message: `Product "${element.Name}" already exists` };
            }
          }
  
          // Check and set MainCategory and SubCategory IDs
          if (element.MainCategory) {
            const isValidMainCategory = await this.categoryRepo.findByName(element.MainCategory);
  
            if (isValidMainCategory) {
              element.MainCategory = isValidMainCategory._id;
  
              if (element.SubCategory) {
                const isValidSubCategory = await this.subCategoryRepo.findByName(element.SubCategory);
                element.SubCategory = isValidSubCategory ? isValidSubCategory._id : null;
              }
            } else {
              element.MainCategory = null;
              element.SubCategory = null;
            }
          }
  
          // Add the product to the repository and return success
          await this.productRepo.addBulkProduct(element);
          return { status: 'success', message: `Product "${element.Name}" added successfully` };
        });
  
        // Wait for all operations to finish
        const results = await Promise.allSettled(addBulkProducts);
  
        // Separate successful and failed operations
        const successfulAdds = results
          .filter(result => result.status === 'fulfilled' && (result as any).value.status === 'success')
          .map(result => (result as any).value.message);
  
        const failedAdds = results
          .filter(result => result.status === 'fulfilled' && (result as any).value.status === 'failed')
          .map(result => (result as any).value.message);
  
        // if (failedAdds.length) {
        //   console.error("Failed to add products:", failedAdds);
        // }
  
        return {
          message: 'Bulk products processed successfully',
          successCount: successfulAdds.length,
          failedCount: failedAdds.length,
          failedMessages: failedAdds,
          successMessages: successfulAdds,
        };
      } else {
        return { message: 'Invalid sheet data format', data: sheetData };
      }
    } catch (error) {
      console.error('Error processing bulk products:', error);
      throw new Error('Failed to add bulk products');
    }
  }
  
  
  
  async bulkDownload(): Promise<any> {
    const ProductResponse = await this.productRepo.findAllProductsInJsonWithAggregation();
     if (ProductResponse.products){
      console.log("product data sets",ProductResponse.products)
       const excelBuffer=await this.excelService.createExcelBuffer(ProductResponse.products)
       return excelBuffer
     }
  }
  
  async updateImage(id: mongoose.Types.ObjectId, index: number, path: string): Promise<boolean | string> {
    const uploadResult = await this.cloudinaryService.uploadProductImage(path);
    const updatedProduct = await this.productRepo.updateImage(id, index, uploadResult.secure_url);
    return updatedProduct.modifiedCount > 0 ? uploadResult.secure_url : false;
  }

  // Retrieve all products
  async getAllProducts(page:number,limit:number): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.findAllProducts(page,limit);
         const products=ProductResponse.products.map((p) => this.mapEntityToDto(p));
         return  {products:products,totalPages:ProductResponse.totalPages}
  }

  // Retrieve all listed products
  async getAllListedProducts(page:number,limit:number): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.findListedAllProducts(page,limit);
    const products= ProductResponse.products.map((p) => this.mapEntityToDto(p));
      return  {products:products,totalPages:ProductResponse.totalPages}
  }

  async SearchByName(page:number,limit:number,productName:string): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.findProductsBySpelling(page,limit,productName);
    const products= ProductResponse.products.map((p) => this.mapEntityToDto(p));
      return  {products:products,totalPages:ProductResponse.totalPages}
  }

  // Filter by category
  async fetchByCategoryAndName(page:number,limit:number,filter:any): Promise<ProductDTO[] | null> {
    const products = await this.productRepo.fetchByCategoryAndName(page, limit,filter);
    return products ? products.map((p) => this.mapEntityToDto(p as any)) : null;
  }
  // liste products under sub category using maincategory id------

  async listProductsBySubcategories(page:number,limit:number,mainCatId:any): Promise<any> {
    const products = await this.productRepo.listProductsBySubcategories(page, limit,mainCatId);
   
    return products
  }

  // Retrieve a product by ID
  async getProductById(id: mongoose.Types.ObjectId): Promise<ProductDTO | null> {
    const product = await this.productRepo.productFindById(id);
    return product ? this.mapEntityToDto(product) : null;
  }

  // Update a product by ID
  async updateProduct(id: mongoose.Types.ObjectId, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null | responseHandler> {
    if (data?.name) {
      const isAvailable = await this.productRepo.findByNameAndNotCurrentId(id, data.name);
      if (isAvailable) {
        return { message: "Product name is already in your bucket", status: 409 };
      }
    }
 

    const updatedProduct = await this.productRepo.updateProduct(id, data);
    return updatedProduct ? this.mapEntityToDto(updatedProduct) : null;
  }

  // List and unlist product
  async listById(id: mongoose.Types.ObjectId): Promise<responseHandler | null> {
    const isListed = await this.productRepo.isListedProduct(id);
    if (isListed) {
      throw new Error("Product is already listed");
    }
    const listProduct = await this.productRepo.updateListing(id, { isListed: true });
    return listProduct.modifiedCount > 0 ? { message: "Product listed" } : null;
  }

  async unListById(id: mongoose.Types.ObjectId): Promise<responseHandler | null> {
    const isListed = await this.productRepo.isListedProduct(id);
    if (!isListed) {
      throw new Error("Product is already unlisted");
    }
    const unlistProduct = await this.productRepo.updateListing(id, { isListed: false });
    return unlistProduct.modifiedCount > 0 ? { message: "Product is unlisted" } : null;
  }

  // Delete a product by ID
  async deleteProduct(id: mongoose.Types.ObjectId): Promise<boolean> {
    const deletedProduct = await this.productRepo.deleteProduct(id);
    return !!deletedProduct;
  }

  // Mapping Product entity to DTO
  private mapEntityToDto(product: Product): ProductDTO {
    return {
      _id: product._id, // Use the hashed ID here
      name: product.name,
      descriptions: product.descriptions,
      category: product.category,
      subCategory: product.subCategory,
      images: product.images,
      variants: product.variants,
      isListed: product.isListed,
      ean: product.ean,
      sku: product.sku,
    };
  }
}
