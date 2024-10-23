import { useApi } from './axiosConfig'
import { creatingCategory } from '../types/categoryType';

class CategoryApi{
    axiosInstance :any=useApi()
    async addCategory(data:creatingCategory): Promise<any> {
        try {
          return await this.axiosInstance.post('/api/categories/category',data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllCategories(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/categories/category?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllListedCategories(): Promise<any> {
        try {
          return await this.axiosInstance.get('/api/categories/listedCategory');
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteCategory(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/api/categories/category/delete/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateCategory(id:string,data:Partial<creatingCategory>): Promise<any> {
        try {
    
          return await this.axiosInstance.put(`/api/categories/category/${id}`,data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async blockCategory(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/api/categories/category/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    
    
}


export default new CategoryApi()