import { useApi } from './axiosConfig'


class ProductApi{
    axiosInstance :any=useApi()
    async addProduct(data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.post('/products/product/admin',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async bulkAddProduct(data:FormData): Promise<any> {
        try {
          return await this.axiosInstance.post('/products/product/bulk/upload/admin',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
    async updateProductImage(productId:string,data:FormData,index:number): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/products/product/update-img/admin/?productId=${productId}&index=${index}`,data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }});
        } catch (error: unknown) {
         
          return error;
        }
      }
      async bulkDownload(): Promise<any> {
        try {
          return await this.axiosInstance.get(`/products/product/bulk/download/admin`, {
            responseType: 'arraybuffer', // Set to receive binary data
          });
        } catch (error: unknown) {
          return error;
        }
    }
    
    async updateProduct(data:any,ProductId:string): Promise<any> {
        try {

          return await this.axiosInstance.put(`/products/product/admin/${ProductId}`,data);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchAllProducts(page:number,limit:number): Promise<any> {
        try {
          return await this.axiosInstance.get(`/products/product/admin/?page=${page}&limit=${limit}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async searchByName(page:number,limit:number,search:string): Promise<any> {
        try {
          return await this.axiosInstance.get(`/products/product/search/admin/?page=${page}&limit=${limit}&searchName=${search}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async deleteProduct(id:string): Promise<any> {
        try {
          return await this.axiosInstance.patch(`/products/product/delete/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    async fetchProductById(id:string): Promise<any> {
        try {
            
          return await this.axiosInstance.get(`/products/product/admin/${id}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
      async listingProduct(id:string,action:string): Promise<any> {
        try {
    
          return await this.axiosInstance.patch(`/products/product/admin/${id}?action=${action}`);
        } catch (error: unknown) {
         
          return error;
        }
      }
    }

  export default new ProductApi()