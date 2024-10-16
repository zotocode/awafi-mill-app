import { useApi } from './axiosConfig'


 class UserApi{
    axiosInstance :any=useApi()
    async fetchAllUserData(): Promise<any> {
        try {
          return await this.axiosInstance.get('/api/admin/allUser');
        } catch (error: unknown) {
         
          return error;
        }
      }
    
}

export default new UserApi()