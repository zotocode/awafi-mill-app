import mongoose from 'mongoose';
import { useApi } from './axiosConfig';

class OrderApi {
  axiosInstance = useApi();

  async getAllOrders(page:number,limit:number,orderStatus?:string,selectedPaymentStatus?:string,orderId?:string,) {
 
    try {
         
      const response = await this.axiosInstance.get(`/api/orders/order/admin/?page=${page}&limit=${limit}&status=${orderStatus}&paymentStatus=${selectedPaymentStatus}&orderId=${orderId}`);
      
      return response;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  }

  async getOrderById(orderId: string) {
    try {
      const response = await this.axiosInstance.get(`/api/orders/order/admin/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string ,trackingId ?:string,reason?:string) {
    try {
      const response = await this.axiosInstance.patch(`/api/orders/order/admin/${orderId}/status`, {
        orderStatus:status,trackingId,reason
      });
      return response;
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }

  async cancelOrder(orderId: mongoose.Types.ObjectId,reason:string) {
    try {
      const response = await this.axiosInstance.patch(`/api/orders/order/admin/${orderId}`,{reason});
      return response;
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  }
  async actionOnReturnOrder(orderId:string,data:{productId:string,variantId:string,returnStatus:'rejected' |'approved'}) {
    try {
      const response = await this.axiosInstance.put(`/api/orders/order/admin/return/${orderId}`,data);
    
      return response;
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  }
}

export default new OrderApi();
