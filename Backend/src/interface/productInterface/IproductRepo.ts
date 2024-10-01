

export interface IproductRepo{
    addProduct(product:any):Promise<any>
    findAllProducts():Promise<any>
    updateListing(id:string,UpdateQuery:any):Promise<any>
    productFindById(id:string):Promise<any>
    updateImage(id:string,index:number,photo:string):Promise<any>
    updateProduct(id:string,data:any):Promise<any>
    isListedProduct(id:string):Promise<any>
   }