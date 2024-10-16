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
    async updateProduct(data:any,ProductId:string): Promise<any> {
        try {

          return await this.axiosInstance.put(`/api/products/product/${ProductId}`,data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllProducts(): Promise<any> {
        try {
          return await this.axiosInstance.get('/api/products/product');
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
    }

  export default new ProductApi()