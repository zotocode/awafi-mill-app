import { Model, Types, isValidObjectId } from "mongoose";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import IOrderRepository from "../../interface/orderInterface/IOrderRepo";

export class OrderRepository extends BaseRepository<ICheckout> implements IOrderRepository {
  constructor(model: Model<ICheckout>) {
    super(model);
  }

  private validateAndConvertId(id: string, type: string): Types.ObjectId {
    if (!isValidObjectId(id)) {
      throw new Error(`Invalid ${type} ID`);
    }
    return new Types.ObjectId(id);
  }

  async create(data: CreateOrderDTO): Promise<ICheckout> {
    try {
      const userObjectId = this.validateAndConvertId(data.user, 'User');
      const orderEntity = {
        user: userObjectId,
        items: data.items,
        totalAmount: data.amount,
        status: 'pending',
        shippingAddress: data.shippingAddress,
        createdAt: new Date()
      };

      return await super.create(data);
    } catch (error) {
      throw new Error(`Error creating order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findAll(params: {
    status?: string;
    page: number;
    limit: number;
  }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
       
      const query: any = {};
      if (params.status) {
        query.orderStatus = params.status;
      }

      const skip = (params.page - 1) * params.limit;
      
      const [orders, total] = await Promise.all([
        this.model
          .find(query)
      // .populate('user')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(params.limit)
          .exec(),
        this.model.countDocuments(query)
      ]);

      return { orders, total, page: params.page, limit: params.limit };
    } catch (error) {
      throw new Error(`Error finding orders: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findByOrderId(orderId: string): Promise<ICheckout | null> {
    try {
      const orderObjectId = this.validateAndConvertId(orderId, 'Order');
      return await this.model
        .findById(orderObjectId)
        // .populate('user')
        .exec();
    } catch (error) {
      throw new Error(`Error finding order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateStatus(data: UpdateOrderStatusDTO): Promise<ICheckout | null> {
    try {
    
    //   const orderObjectId = this.validateAndConvertId(data.orderId, 'Order');
      return await this.model.findByIdAndUpdate(
        data.orderId,
        { 
          $set: { 
            orderStatus: data.orderStatus,
            updatedAt: new Date(),
            trackingId:data.trackingId
          } 
        },
        { new: true }
      ).exec();
    } catch (error) {
      throw new Error(`Error updating order status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async cancel(orderId: string): Promise<boolean> {
    try {
      const orderObjectId = this.validateAndConvertId(orderId, 'Order');
      const result = await this.model.findOneAndUpdate(
        {
          _id: orderObjectId,
          orderStatus: { $nin: ['cancelled', 'delivered'] }
        },
        {
          $set: {
            orderStatus: 'cancelled',
            updatedAt: new Date()
          }
        }
      ).exec();

      return !!result;
    } catch (error) {
      throw new Error(`Error cancelling order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findByUserId(params: {
    userId: string;
    status?: string;
    page: number;
    limit: number;
  }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const userObjectId = this.validateAndConvertId(params.userId, 'User');
      const query: any = { user: userObjectId };
      
      if (params.status) {
        query.orderStatus = params.status;
      }

      const skip = (params.page - 1) * params.limit;
      
      const [orders, total] = await Promise.all([
        this.model
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(params.limit)
          .exec(),
        this.model.countDocuments(query)
      ]);

      return {
        orders,
        total,
        page: params.page,
        limit: params.limit
      };
    } catch (error) {
      throw new Error(`Error finding user orders: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async findByOrderIdAndUserId(orderId: string, userId: string): Promise<ICheckout | null> {
    try {
      const orderObjectId = this.validateAndConvertId(orderId, 'Order');
      const userObjectId = this.validateAndConvertId(userId, 'User');

      return await this.model.findOne({
        _id: orderObjectId,
        user: userObjectId
      }).exec();
    } catch (error) {
      throw new Error(`Error finding user order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async cancelWithReason(orderId: string, userId: string, cancellationReason: string): Promise<boolean> {
    try {
      const orderObjectId = this.validateAndConvertId(orderId, 'Order');
      const userObjectId = this.validateAndConvertId(userId, 'User');

      const result = await this.model.findOneAndUpdate(
        {
          _id: orderObjectId,
          user: userObjectId,
          orderStatus: { $nin: ['cancelled', 'delivered'] }
        },
        {
          $set: {
            orderStatus: 'cancelled',
            cancellationReason: cancellationReason,
            updatedAt: new Date()
          }
        }
      ).exec();

      return !!result;
    } catch (error) {
      throw new Error(`Error cancelling order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}