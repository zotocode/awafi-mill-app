import { useApi } from './axiosConfig'


class dashBoardApi{
    axiosInstance :any=useApi()
    async orderStatus(): Promise<any> {
        try {
          return await this.axiosInstance.get('/api/admin/allOrders')
        } catch (error: unknown) {   
          return error;
        }
      }
    
    
}


export default new dashBoardApi()