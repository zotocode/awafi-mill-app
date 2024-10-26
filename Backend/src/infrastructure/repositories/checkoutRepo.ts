// infrastructure/repositories/checkoutRepo.ts
import { Model } from "mongoose";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo"; 
import { CheckoutDTO,OrderSummary,RevenueSummary } from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'; 



export class CheckoutRepository extends BaseRepository<ICheckout> implements ICheckoutRepo {
  constructor(model: Model<ICheckout>) {
    super(model);
  }

  async createCheckout(data: CheckoutDTO): Promise<ICheckout> {
    const checkoutEntity = { user: data.userId, paymentMethod: data.paymentMethod };
    return await super.create(checkoutEntity);
  }

  async viewAllorders(): Promise<OrderSummary[]> {
    try {
      const result = await this.model.aggregate([
        {
          $match: {
            orderStatus: { $in: ['delivered', 'shipped', 'returned', 'processing'] } 
          }
        },
        {
          $group: {
            _id: "$orderStatus", 
            totalCount: { $sum: 1 }, 
            totalAmount: { $sum: "$amount" } 
          }
        },
        {
          $project: {
            _id: 0,
            orderStatus: "$_id",
            totalCount: 1,
            totalAmount: 1
          }
        }
      ])
      return result; 
    } catch (error) {
      throw error; 
    }
  }
  

  async viewRevenue(period: string | undefined): Promise<RevenueSummary[]> {
    try {
      const now = new Date();
      let matchCondition: any = { paymentStatus: 'completed' }; 
      let groupBy: any;
  
      if (period === 'day') {
        matchCondition.paymentCompletedAt = {
          $gte: startOfDay(now),
          $lte: endOfDay(now)
        };
        groupBy = { day: { $dayOfMonth: "$paymentCompletedAt" } };
  
      } else if (period === 'week') {
        matchCondition.paymentCompletedAt = {
          $gte: startOfWeek(now, { weekStartsOn: 1 }), 
          $lte: endOfWeek(now, { weekStartsOn: 1 })
        };
        groupBy = { day: { $dayOfMonth: "$paymentCompletedAt" } };
  
      } else if (period === 'month') {
        matchCondition.paymentCompletedAt = {
          $gte: startOfMonth(now),
          $lte: endOfMonth(now)
        };
        groupBy = { day: { $dayOfMonth: "$paymentCompletedAt" } };
      }
  
      const result = await this.model.aggregate([
        { $match: matchCondition },
        {
          $group: {
            _id: groupBy,
            totalRevenue: { $sum: "$amount" },  
            count: { $sum: 1 }                  
          }
        },
        {
          $project: {
            _id: 0, 
            day: "$_id.day",
            totalRevenue: 1,
            count: 1
          }
        }
      ]);   
      console.log(result);
      
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
