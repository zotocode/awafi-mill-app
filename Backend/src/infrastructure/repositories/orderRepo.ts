import mongoose, { Model, Types, isValidObjectId } from "mongoose";
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

  async findAll(params: { page: number; limit: number; status: string|null; paymentStatus: string|null,orderId:string|null }): Promise<{
    orders: ICheckout[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const { page, limit, status, paymentStatus,orderId } = params;
      const skip = (page - 1) * limit;
  
      // Initialize query
      const query: Record<string, any> = {};
      if (orderId) {
        query.orderId = { $regex: `^${orderId}`, $options: 'i' }; 
      }
       if (paymentStatus && ["pending", "completed", "failed"].includes(paymentStatus)) {
        query.paymentStatus = paymentStatus;
      }
      // Handle "returned" status
      if (status === "returned" && status) {
        query.$or = [
          { returnStatus: { $in: ["requested", "approved", "rejected"] } },
          { "items.returnStatus": { $in: ["requested", "approved", "rejected"] } },
        ];
      } else if(status) {
       
        // Add orderStatus condition for non-returned status
        if (["processing", "shipped", "delivered", "cancelled"].includes(status)) {
          query.orderStatus = status;
        }
      }
      
      // Execute aggregation pipeline and count
      const [orders, total] = await Promise.all([
        this.model.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "users",
              let: { userId: "$user" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                { $project: { password: 0, _id: 0 } },
              ],
              as: "userDetails",
            },
          },
          {
            $addFields: {
              hasReturnRequest: {
                $cond: {
                  if: {
                    $gt: [
                      { $size: { $filter: { input: "$items", as: "item", cond: { $in: ["$$item.returnStatus", ["requested"]] } } } },
                      0,
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              _id: 1,
              user: 1,
              trackingId: 1,
              transactionId:1,
              orderStatus: 1,
              paymentStatus: 1,
              orderId:1,
              amount: 1,
              currency: 1,
              items: 1,
              shippingAddress: 1,
              paymentMethod: 1,
              createdAt: 1,
              updatedAt: 1,
              discountAmount: 1,
              userDetails: { $arrayElemAt: ["$userDetails", 0] },
              hasReturnRequest: 1, // Include the hasReturnRequest field
              deliveredAt:1,
              orderPlacedAt:1

            },
          },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ]),
        this.model.countDocuments(query),
      ]);
  
      return { orders, total, page, limit };
    } catch (error) {
      throw new Error(`Error finding orders: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  

  async findByOrderId(orderId: mongoose.Types.ObjectId): Promise<ICheckout | null> {
    try {
     
      return await this.model
        .findById(orderId)
        // .populate('user')
        .exec();
    } catch (error) {
      throw new Error(`Error finding order: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async updateStatus(data: UpdateOrderStatusDTO): Promise<ICheckout | null> {
    try {
      // Prepare the update fields
      const updateFields: Record<string, any> = {
        orderStatus: data.orderStatus,
        updatedAt: new Date(),
      };
  
      // Only include trackingId if it's a non-null and non-empty string
      if (data.trackingId && typeof data.trackingId === 'string' && data.trackingId.trim().length > 0) {
        updateFields.trackingId = data.trackingId;
      }
  
      // Update the document
      return await this.model
        .findByIdAndUpdate(
          data.orderId,
          { $set: updateFields },
          { new: true }
        )
        .exec();
    } catch (error) {
      throw new Error(`Error updating order status: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  

  async cancelOrder(orderId: string,reason:string): Promise<boolean> {
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
            cancellationReason: reason,
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

  async returnOneProduct(orderId:string, returnData:{ returnReason: string; productId: string; variantId: string }):Promise<any>
  {
    const { productId, variantId, returnReason } = returnData;

    // Update the return status and reason for the specific product variant
    const result = await this.model.updateOne(
      { _id: orderId, "items.productId": productId, "items.variantId": variantId ,orderStatus:"delivered", "items.returnStatus": { $ne: "requested" }},
      {
        $set: {
          "items.$.returnStatus": "requested",
          "items.$.returnReason": returnReason,
          returnRequestedAt: new Date(),
        },
      })


    return result.modifiedCount > 0
    ? { success: true, message: "Product return requested successfully." }
    : { success: false, message: "Product or variant not found in the order." };
  }

async  returnTheOrder(orderId:string, returnReason:string):Promise<any>
  {
    const result = await this.model.updateOne(
      { _id: orderId,orderStatus:"delivered" },
      {
        $set: {
        
          returnRequestedAt: new Date(),
          returnStatus: "requested",
          returnReason:returnReason

        },
      }
    );

    return result.modifiedCount > 0
      ? { success: true, message: "Order return requested successfully." }
      : { success: false, message: "Order not found " };
  }

  async actionOnReturnOneProduct(
    orderId: string,
    data: { productId: string; variantId: string; returnStatus: 'approved' | 'rejected'; refundAmount: number }
  ): Promise<any> {
    const { returnStatus, refundAmount, productId, variantId } = data;
  
    const result = await this.model.updateOne(
      {
        _id: orderId,
        orderStatus: "delivered",
        "items.productId": productId,
        "items.variantId": variantId, // Match the specific product and variant
      },
      {
        $set: {
          "items.$.returnStatus": returnStatus,
          "items.$.refundAmount": refundAmount,
        }
    
      }
    );
  
    return result;
  }
  
  async returnOrder(orderId:string,returnStatus:'approved'| 'rejected'):Promise<any>
  {

    const result =await this.model.updateOne(
      {_id:orderId,orderStatus:"delivered"},
      {$set:{
        returnStatus:returnStatus
      }}
    )




  }

}