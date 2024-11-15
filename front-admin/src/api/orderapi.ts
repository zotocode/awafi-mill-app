import { useApi } from './axiosConfig';

class OrderApi {
  axiosInstance = useApi();

  async getAllOrders() {
    try {
      const response = await this.axiosInstance.get('/orders/order/admin');
      
      return response;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  }

  async getOrderById(orderId: string) {
    try {
      const response = await this.axiosInstance.get(`/orders/order/admin/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string ,trackingId ?:string,reason?:string) {
    try {
      const response = await this.axiosInstance.patch(`/orders/order/admin/${orderId}/status`, {
        orderStatus:status,trackingId,reason
      });
      return response;
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }

  async cancelOrder(orderId: string) {
    try {
      const response = await this.axiosInstance.delete(`/orders/order/admin/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  }
}

export default new OrderApi();
