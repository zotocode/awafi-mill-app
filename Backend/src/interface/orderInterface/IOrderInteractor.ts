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
  getOrderById(orderId: string): Promise<OrderDTO | null>;
  updateOrderStatus(data: UpdateOrderStatusDTO): Promise<OrderDTO | null>;
  cancelOrder(orderId: string): Promise<boolean>;
  getUserOrders(params: { userId: string; status?: string; page: number; limit: number }): Promise<any>;
  getUserOrderById(orderId: string, userId: string): Promise<any>;
  cancelUserOrder(orderId: string, userId: string, cancellationReason: string): Promise<any>;
}