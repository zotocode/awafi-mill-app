import mongoose from "mongoose";
import { CreateOrderDTO, OrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";

export default interface IOrderInteractor {
  createOrder(data: CreateOrderDTO): Promise<OrderDTO>;
  getOrders(params: {
    page: number;
    limit: number;
  }): Promise<{
    orders: OrderDTO[];
    total: number;
    page: number;
    limit: number;
  }>;
  getOrderById(orderId: mongoose.Types.ObjectId): Promise<OrderDTO | null>;
  updateOrderStatus(data: UpdateOrderStatusDTO): Promise<OrderDTO | null>;
  cancelOrder(orderId: string,reason:string): Promise<boolean>;
  getUserOrders(params: { userId: string; status?: string; page: number; limit: number }): Promise<any>;
  getUserOrderById(orderId: string, userId: string): Promise<any>;
  cancelUserOrder(orderId: string, userId: string, cancellationReason: string): Promise<any>;
  returnUserOrder(orderId: string, userId: string, returnData:{ returnReason:string,productId?:string,variantId?:string}): Promise<any>;
  actionOnReturnOrder(orderId: string, returnData:{ productId?:string,variantId?:string,returnStatus:'approved'| 'rejected'}): Promise<any>;
}