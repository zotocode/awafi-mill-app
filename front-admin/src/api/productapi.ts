import { useApi } from './axiosConfig'
import { Product } from '../types/productTypes';

class ProductApi{
    axiosInstance :any=useApi()
    async addProduct(data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.post('/api/products/product',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async bulkAddProduct(data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.post('/api/products/product/bulk',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateProductImage(productId:string,data:FormData,index:number): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/api/products/product/update-img?productId=${productId}&index=${index}`,data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateProduct(data:any,ProductId:string): Promise<any> {
        try {

          return await this.axiosInstance.put(`/api/products/product/${ProductId}`,data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllProducts(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/products/product?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteProduct(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/api/products/product/delete/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchProductById(id:string): Promise<any> {
        try {
            
          return await this.axiosInstance.get(`/api/products/product/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
      async listingProduct(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/api/products/product/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    }

  export default new ProductApi()