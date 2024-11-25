import { useApi } from './axiosConfig'

class SubCategoryApi{
    axiosInstance :any=useApi()
    async addCategory(data:FormData): Promise<any> {
       
          return await this.axiosInstance.post('/api/sub-categories/category/sub/admin',data,{headers: { 'Content-Type': 'multipart/form-data' }});
     
      }
    async fetchAllCategories(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/sub-categories/category/sub/admin?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
      async searchCategories(debouncedSearchTerm:string,page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/sub-categories/category/search/sub/admin?page=${page}&limit=${limit}&searchName=${debouncedSearchTerm}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllListedCategories(id:string): Promise<any> {
        try {
          return await this.axiosInstance.get(`/api/sub-categories/listedCategory/sub/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteCategory(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/api/sub-categories/category/sub/delete/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateCategory(id:string,data:FormData): Promise<any> {
     
          return await this.axiosInstance.put(`/api/sub-categories/category/sub/admin/${id}`,data,{headers: { 'Content-Type': 'multipart/form-data' }});
       
      }
    async getAvailablePriorities(): Promise<any> {
     
          return await this.axiosInstance.get(`/api/sub-categories/category/sub/availble-priorities`);
       
      }
    async lisitingAndUnlisting(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/api/sub-categories/category/sub/admin/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    
    
}


export default new SubCategoryApi()