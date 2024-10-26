import { useApi } from './axiosConfig'
import { creatingCategory, creatingSubCategory } from '../types/categoryType';

class SubCategoryApi{
    axiosInstance :any=useApi()
    async addCategory(data:creatingSubCategory): Promise<any> {
        try {
          return await this.axiosInstance.post('/api/categories/category/sub/admin',data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllCategories(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/categories/category/sub/admin?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
      async searchCategories(debouncedSearchTerm:string,page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/categories/category/search/sub/admin?page=${page}&limit=${limit}&searchName=${debouncedSearchTerm}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllListedCategories(id:string): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/categories/listedCategory/sub/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteCategory(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/api/categories/category/sub/delete/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateCategory(id:string,data:any): Promise<any> {
        try {
    
          return await this.axiosInstance.put(`/api/categories/category/sub/admin/${id}`,data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async lisitingAndUnlisting(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/api/categories/category/sub/admin/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    
    
}


export default new SubCategoryApi()