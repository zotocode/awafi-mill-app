import Product from "../../domain/entities/productSchema"


// src/interface/productInterface/IproductRepo.ts
export interface IproductRepo{
    addProduct(product:any):Promise<any>
    fetchByCategory(mainCategoryId:string,subCategoryId:string):Promise<any>
    findAllProducts():Promise<any>
    updateListing(id:string,UpdateQuery:any):Promise<any>
    productFindById(id:any):Promise<any>
    updateImage(id:string,index:number,photo:string):Promise<any>
    updateProduct(id:string,data:any):Promise<any>
    isListedProduct(id:string):Promise<any>
    findByName(id:string):Promise<any>
    updateVariantQuantity(productId: string, variantId: string, quantity: number): Promise<Product | null>;

   }