import { ProductCreationDTO, ProductDTO ,Variant } from "../../domain/dtos/ProductDTO";
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
        const results = [];
      
        for (const element of sheetData) {
          try {
            if (!element.name) {
              results.push({ status: 'failed', message: `Product entry is missing the "name" field.` });
              continue;
            }
      
            const existingProduct = await this.productRepo.findByName(element.name.trim().toLowerCase());
      
            if (existingProduct) {
          
              const existingVariant = existingProduct.variants.find(
                (v: Variant) => v.weight === element.variantWeight
              );
      
              if (existingVariant) {
    
                existingVariant.inPrice = element.variantInPrice;
                existingVariant.outPrice = element.variantOutPrice;
                existingVariant.stockQuantity = element.variantStockQuantity;
                await existingProduct.save();
                results.push({
                  status: 'failed',
                  message: `Product "${element.name}" with variant weight "${element.variantWeight}" already exists and was updated.`,
                });
              } else {
       
                existingProduct.variants.push({
                  weight: element.variantWeight,
                  inPrice: element.variantInPrice,
                  outPrice: element.variantOutPrice,
                  stockQuantity: element.variantStockQuantity,
                });
                await existingProduct.save();
                results.push({
                  status: 'success',
                  message: `New variant for product "${element.name}" added successfully.`,
                });
              }
            } else {
              if (element.mainCategory) {
        
                const mainCategory = await this.categoryRepo.findByName(element.mainCategory);
                element.mainCategory = mainCategory ? mainCategory._id : null;
            //  console.log(" is existig main",mainCategory)
                if (element.subCategory && mainCategory) {
                  // console.log("Sub category",element.subCategory)
                  const subCategory = await this.subCategoryRepo.findByName(element.subCategory);
                  element.subCategory = subCategory ? subCategory._id : null;
                } else {
                  element.subCategory = null;
                }
              }
          
              await this.productRepo.addBulkProduct(element);

              results.push({ status: 'success', message: `Product "${element.name}" added successfully.` });
            }
          } catch (error) {
            results.push({
              status: 'failed',
              message: `Failed to process product "${element.name}": ${error.message}`,
            });
          }
        }
      
        const successMessages = results.filter((result) => result.status === 'success').map((result) => result.message);
        const failedMessages = results.filter((result) => result.status === 'failed').map((result) => result.message);
      
        return {
          message: 'Bulk product processing completed',
          successCount: successMessages.length,
          failedCount: failedMessages.length,
          successMessages,
          failedMessages,
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
  async getAllListedProducts(page:number,limit:number,userId?:string | null): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.findListedAllProducts(page,limit,userId);
     console.log("ProduuctResponse",ProductResponse)
    const products= ProductResponse.products.map((p) => this.mapEntityToDto(p));
      return  {products:products,totalPages:ProductResponse.totalPages}
  }

  async SearchByName(page:number,limit:number,productName:string): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.findProductsBySpelling(page,limit,productName);
    const products= ProductResponse.products.map((p) => this.mapEntityToDto(p));
      return  {products:products,totalPages:ProductResponse.totalPages}
  }

  // Filter by category
  async fetchByCategoryAndName(page:number,limit:number,filter:any,userId?:string | null): Promise<ProductResponseDTO> {
    const ProductResponse = await this.productRepo.fetchByCategoryAndName(page, limit,filter);
    const products= ProductResponse.products.map((p) => this.mapEntityToDto(p));
    return  {products:products,totalPages:ProductResponse.totalPages}
  }
  // liste products under sub category using maincategory id------

  async listProductsBySubcategories(page:number,limit:number,mainCatId:any,userId?:string | null): Promise<any> {
    const products = await this.productRepo.listProductsBySubcategories(page, limit,mainCatId);
   
    return products
  }

  // Retrieve a product by ID
  async getProductById(id: mongoose.Types.ObjectId,userId?:string | null): Promise<ProductDTO | null> {
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
