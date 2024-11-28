import { ICheckout } from "../../domain/entities/checkoutSchema";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import mongoose from "mongoose";

export default interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<ICheckout>;
  
  findAll(params: {
    page: number;
    limit: number;
    status:string |null;
    paymentStatus:string |null
    orderId:string | null
  }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }>;

  
  findByOrderId(orderId: mongoose.Types.ObjectId): Promise<ICheckout | null>;

 
  
  updateStatus(data: UpdateOrderStatusDTO): Promise<ICheckout | null>;
  
  cancelOrder(orderId: string,reason:String): Promise<boolean>;
  
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

  returnOneProduct(orderId:string, returnData:{ returnReason: string; productId: string; variantId: string }):Promise<any>
  returnTheOrder(orderId:string, returnReason:string):Promise<any>


  returnOrder(orderId:string,returnStatus:'approved'| 'rejected'):Promise<any>
  actionOnReturnOneProduct(orderId: string,data:{ productId: string,
    variantId: string,returnStatus:'approved'| 'rejected',refundAmount:number}): Promise<any>;
}