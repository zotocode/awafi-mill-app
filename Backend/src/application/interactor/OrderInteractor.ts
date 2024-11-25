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
  async returnUserOrder(
    orderId: string,
    userId: string,
    returnData: { returnReason: string; productId?: string; variantId?: string }
  ): Promise<any> {
    // Validate required parameters
    if (!orderId || !userId || !returnData?.returnReason) {
      throw new Error('Missing required fields: orderId, userId, or returnReason.');
    }
    const orderObjectId=new mongoose.Types.ObjectId(orderId)
    const order =await this.orderRepository.findByOrderId(orderObjectId)
    if(order && (order.paymentStatus != "completed"  || order.orderStatus !== "delivered"))
    {
      throw new Error("delivered and payment completed product can only return")
    }
 
    if (returnData.productId && returnData.variantId) {
      // Ensure returnData contains productId and variantId before passing to returnOneProduct
      const data: { returnReason: string; productId: string; variantId: string } = {
        returnReason: returnData.returnReason,
        productId: returnData.productId,
        variantId: returnData.variantId,
      };
      
      // Handle returning a specific product variant
      return await this.orderRepository.returnOneProduct(orderId, data);
    }
  
    // Handle returning the entire order
    return await this.orderRepository.returnTheOrder(orderId, returnData.returnReason);
  }





  async actionOnReturnOrder(
    orderId: string,
    returnData: { productId?: string; variantId?: string; returnStatus: 'approved'| 'rejected' }
  ): Promise<any> {
   console.log("dataaaaa",returnData)

    if (!orderId || !returnData) {
      throw new Error('Missing required fields: orderId or returnData.');
    }
  
    // Check for the return reason in case of returning the entire order
    if (!returnData.returnStatus && !(returnData.productId && returnData.variantId)) {
      throw new Error('return status is required for returning');
    }
  

    const orderObjectId = new mongoose.Types.ObjectId(orderId);
    
    // Fetch the order from the repository
    const order = await this.orderRepository.findByOrderId(orderObjectId);
  
    // Ensure the order exists and meets return conditions
    if (!order) {
      throw new Error('Order not found.');
    }
    if (order.paymentStatus !== 'completed' || order.orderStatus !== 'delivered') {
      throw new Error('Only delivered and payment completed products can be returned.');
    }


  
    // Check if it's a product-level return
    if (returnData.productId && returnData.variantId ) {
      // Ensure returnData contains productId and variantId before passing to returnOneProduct
      const item = order.items.find(
        (e) => e.productId?.toString() === returnData.productId && e.variantId?.toString() === returnData.variantId
      );
      if (!item) {
        throw new Error('Product or variant not found in the order.');
      }

    const refundAmount = item.price * item.quantity;
      const data = {
        productId: returnData.productId,
        variantId: returnData.variantId,
        returnStatus:returnData.returnStatus,
        refundAmount
      };
  
      // Handle returning a specific product variant
      return await this.orderRepository.actionOnReturnOneProduct(orderId, data);
    }
  

    return await this.orderRepository.returnOrder(orderId,returnData.returnStatus);
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
      paymentMethod: order.paymentMethod,
      currency: order.currency || 'USD',
      discountAmount: order.discountAmount || 0,
      paymentStatus:order.paymentStatus,
      trackingId:order.trackingId || '',
      userDetails:order.userDetails,
     
    };
  }
} 
