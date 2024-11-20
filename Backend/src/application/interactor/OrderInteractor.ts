import mongoose from "mongoose";
import { CreateOrderDTO, OrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import { ICheckout} from "../../domain/entities/checkoutSchema";
import IOrderInteractor from "../../interface/orderInterface/IOrderInteractor";
import IOrderRepository from "../../interface/orderInterface/IOrderRepo";

export class OrderInteractor implements IOrderInteractor {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(data: CreateOrderDTO): Promise<OrderDTO> {
    const order = await this.orderRepository.create(data);
    return this.mapToDTO(order);
  }

  async getOrders(params: {
    page: number;
    limit: number;
  }): Promise<{
    orders: OrderDTO[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.orderRepository.findAll(params);
    return {
      orders: result.orders.map(order => this.mapToDTO(order)),
      total: result.total,
      page: result.page,
      limit: result.limit
    };
  }

  async getOrderById(orderId: mongoose.Types.ObjectId): Promise<OrderDTO | null> {
    const order = await this.orderRepository.findByOrderId(orderId);
    return order ? this.mapToDTO(order) : null;
  }

  async updateOrderStatus(data: UpdateOrderStatusDTO): Promise<OrderDTO | null> {
    const { orderId, orderStatus } = data;
  
    const orderData = await this.orderRepository.findByOrderId(orderId);
  
    if (!orderData) {
      throw new Error("Order not found");
    }
  
    if (orderStatus === "shipped" || orderStatus === "delivered") {
      if (orderData.paymentStatus === "pending" || orderData.paymentStatus === "failed") {
        throw new Error("Payment is not completed");
      }
    }
  
    const updatedOrder = await this.orderRepository.updateStatus(data);
  
    return updatedOrder ? this.mapToDTO(updatedOrder) : null;
  }
  
  async cancelOrder(orderId: string,reason:string): Promise<boolean> {
    
    return await this.orderRepository.cancelOrder(orderId,reason);
  }

  async getUserOrders(params: {
    userId: string;
    status?: string;
    page: number;
    limit: number;
  }): Promise<{
    orders: OrderDTO[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.orderRepository.findByUserId(params);
    return {
      orders: result.orders.map(order => this.mapToDTO(order)),
      total: result.total,
      page: result.page,
      limit: result.limit
    };
  }

  async getUserOrderById(orderId: string, userId: string): Promise<OrderDTO | null> {
    const order = await this.orderRepository.findByOrderIdAndUserId(orderId, userId);
    return order ? this.mapToDTO(order) : null;
  }

  async cancelUserOrder(orderId: string, userId: string, cancellationReason: string): Promise<boolean> {
    return await this.orderRepository.cancelWithReason(orderId, userId, cancellationReason);
  }

  private mapToDTO(order: ICheckout): OrderDTO {
    return {
      _id: order._id,
      user: order.user,
      transactionId:order.transactionId  || '',
      amount: order.amount,
      items:order.items,
      cancellationReason:order.cancellationReason || '',
      orderStatus: order.orderStatus,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      cart: order.cart,
      paymentMethod: order.paymentMethod,
      currency: order.currency || 'USD',
      discountAmount: order.discountAmount || 0,
      paymentStatus:order.paymentStatus,
      trackingId:order.trackingId || '',
      userDetails:order.userDetails,
     
    };
  }
} 
