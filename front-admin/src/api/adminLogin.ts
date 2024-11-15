import { useApi } from './axiosConfig'


 class AuthApi{
    axiosInstance :any=useApi()
    async adminAuth(email:string,password:string): Promise<any> {
        try {
          return await this.axiosInstance.post('/admin/login',{email,password});
        } catch (error: unknown) {
            console.log("error,e",error)
          return error;
        }
      }
    
}

export default new AuthApi()