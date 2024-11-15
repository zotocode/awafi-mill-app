import { useApi } from './axiosConfig';

class UserApi {
  axiosInstance: any = useApi();

  // Fetch all users data
  async fetchAllUserData(): Promise<any> {
    try {
      return await this.axiosInstance.get('/api/admin/allUser');
    } catch (error: unknown) {
      console.error('Error fetching users:', error);
      return error;
    }
  }

  

  // Block user
  async blockUser(email:any): Promise<any> {
    try {
      return await this.axiosInstance.post(`/api/admin/blockUser`,{email});
    } catch (error: unknown) {
      console.error(`Error blocking user with id ${email}:`, error);
      return error;
    }
  }

  // Unblock user
  async unblockUser(email:any): Promise<any> {
    try {
      return await this.axiosInstance.post(`/api/admin/unblockUser`,{email});
    } catch (error: unknown) {
      console.error(`Error unblocking user with id ${email}:`, error);
      return error;
    }
  }
}

export default new UserApi();
