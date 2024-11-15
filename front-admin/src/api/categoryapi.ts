import { useApi } from './axiosConfig'

class CategoryApi{
    axiosInstance :any=useApi()
    async addCategory(data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.post('/categories/category/admin',data,
            {headers: { 'Content-Type': 'multipart/form-data' }}
          );
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllCategories(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/categories/category/admin?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async searchCategories(debouncedSearchTerm:string,page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/categories/category/search/admin?page=${page}&limit=${limit}&searchName=${debouncedSearchTerm}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllListedCategories(): Promise<any> {
        try {
          return await this.axiosInstance.get('/categories/listedCategory/admin');
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteCategory(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/categories/category/delete/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateCategory(id:string,data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.put(`/categories/category/admin/${id}`,data,
            {headers: { 'Content-Type': 'multipart/form-data' }}
          );
        } catch (error: unknown) {
         
          return error;
        }
      }
    async blockCategory(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/categories/category/admin/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    
    
}


export default new CategoryApi()