import { ICheckout } from "../../domain/entities/checkoutSchema";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";

export default interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<ICheckout>;
  
  findAll(params: {
    status?: string;
    page: number;
    limit: number;
  }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }>;
  
  findByOrderId(orderId: string): Promise<ICheckout | null>;
  
  updateStatus(data: UpdateOrderStatusDTO): Promise<ICheckout | null>;
  
  cancel(orderId: string): Promise<boolean>;
  
  findByUserId(params: { 
    userId: string; 
    status?: string; 
    page: number; 
    limit: number; 
  }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }>;
  
  findByOrderIdAndUserId(orderId: string, userId: string): Promise<ICheckout | null>;
  
  cancelWithReason(orderId: string, userId: string, cancellationReason: string): Promise<boolean>;
}