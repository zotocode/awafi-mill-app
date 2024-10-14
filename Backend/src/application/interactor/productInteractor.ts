import { ProductCreationDTO, ProductDTO } from "../../domain/dtos/ProductDTO";
import { ProductRepository } from "../../infrastructure/repositories/productRepository";
import IProductInteractor from "../../interface/productInterface/IproductInteractor";
import Product  from "../../domain/entities/productSchema";
import { error } from "console";
import {resposeHandler} from '../../types/commonTypes'




export class ProductInteractor implements IProductInteractor {
  private productRepo: ProductRepository;


  constructor(productRepo: ProductRepository) {
    this.productRepo = productRepo;
  
  }

  // Adding a new product
  async addProduct(productData: ProductCreationDTO): Promise<ProductDTO |resposeHandler> {

  
    const{name}=productData
    const isAvailable=await this.productRepo.findByName(name)
    if(isAvailable)
    {
      return { message: "Product is always in your bucket", status: 409 };

    }
 
    const createdProduct = await this.productRepo.addProduct(productData);
    return this.mapEntityToDto(createdProduct);
  }
  async updateImage(id:string,index:number,photo:string): Promise<boolean> {
    const updatedProduct = await this.productRepo.updateImage(
      id,index,photo
    );
    return updatedProduct.nModified >0 ? true: false;
  }

  // Retrieve all products
  async getAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productRepo.findAllProducts();
    return products.map((p) => this.mapEntityToDto(p));
  }

  // Retrieve a product by ID
  async getProductById(id: string): Promise<ProductDTO | null> {

    const product = await this.productRepo.productFindById(id);
    return product ? this.mapEntityToDto(product) : null;
  }

  // Update a product by ID
  async updateProduct(id: string, data: Partial<ProductCreationDTO>): Promise<ProductDTO | null |resposeHandler> {
    if(data?.name)
    {
      const isAvailable=await this.productRepo.findByNameAndNotCurrentId(id,data.name)
      if(isAvailable)
      {
        return { message: "Product name is always in your bucket", status: 409 };
  
      }

    }
    const updatedProduct = await this.productRepo.update(id, data);
    return updatedProduct ? this.mapEntityToDto(updatedProduct) : null;
  }
  // list and unlist product-------------------

  async listById(id: string): Promise<resposeHandler | null> {
     const isListed=await this.productRepo.isListedProduct(id)
     if(isListed)
     {
       throw error("product is already listed")
     }
    const listProduct = await this.productRepo.updateListing(id,{isListed:true});
    return listProduct.modifiedCount > 0 ? { message:"product listed" } : null;
  }
  async unListById(id: string): Promise<resposeHandler | null> {
    const isListed=await this.productRepo.isListedProduct(id)
    if(!isListed)
    {
      throw error("product is already unlisted",)
    }
    const unlistProduct = await this.productRepo.updateListing(id, {isListed:false});
    return unlistProduct.modifiedCount >0  ? {message:"product is unlisted"}:null;
  }

  // Delete a product by ID
  // async deleteProduct(id: string): Promise<boolean> {
  //   const deletedProduct = await this.productRepo.delete(id);
  //   return !!deletedProduct;
  // }

  // private mapDtoToEntity(productData: ProductDTO): Product {
  //   if (!productData.name || !productData.description || !productData.price) {
  //     throw error('Required fields are missing in ProductDTO');
  //   }
  
   
  
  //   return {
  //     name: productData.name,
  //     description: productData.description,
  //     price: productData.price,
  //     originalPrice: productData.originalPrice,
  //     weight: productData.weight,
  //     category: productData.category,
  //     images: productData.images,
  //     variants: productData.variants,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   } as Product;
  // }
  

  // Mapping Product entity to DTO
  private mapEntityToDto(product: Product): ProductDTO {
  
    return {
      _id: product._id, // Use the hashed ID here
      name: product.name,
      descriptions:product.descriptions,
      category: product.category,
      images: product.images,
      variants: product.variants,
      isListed:product.isListed
    };
  }
  
}
