// infrastructure/repositories/checkoutRepo.ts
import { Model } from "mongoose";
import { PipelineStage } from "mongoose";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo"; 
import { CheckoutDTO,OrderSummary,RevenueSummary,CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'; 



export class CheckoutRepository extends BaseRepository<ICheckout> implements ICheckoutRepo {
  constructor(model: Model<ICheckout>) {
    super(model);
  }

  async createCheckout(data:CheckoutCreateDTO ): Promise<ICheckout> {
   
    return await super.create(data);
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


  async generateProductSalesReport(
    startDate: string,
    endDate: string,
    interval: 'day' | 'week' | 'month' | 'year'
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log("Start Date:", start);
console.log("End Date:", end);

const testDocuments = await this.model.find().limit(5).exec();
console.log("Sample Documents:", testDocuments);


const simpleQuery = await this.model.find({
  createdAt: { $gte: start, $lte: end }
}).exec();
console.log("Simple Query Results:", simpleQuery);

  
    const groupByDate: { [key: string]: any } = {
      day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      week: { $dateToString: { format: "%Y-%U", date: "$createdAt" } },
      month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      year: { $dateToString: { format: "%Y", date: "$createdAt" } }
    };
  
    const pipeline: PipelineStage[] = [
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          orderStatus: "delivered",
          paymentStatus: "completed"
        }
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: {
            date: groupByDate[interval], // Adjust here for different intervals
            product: "$items.product"
          },
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$amount", "$items.quantity"] } }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      },
      {
        $project: {
          date: "$_id.date",
          productId: "$_id.product",
          productName: "$productDetails.name",
          totalQuantity: 1,
          totalRevenue: 1
        }
      },
      {
        $sort: { date: 1 }
      }
    ];
    
  
    try {
      console.log("Pipeline:", JSON.stringify(pipeline, null, 2)); // Log the pipeline
      const report = await this.model.aggregate(pipeline).exec();
      console.log("Sales Report:", report); // Log the result
      return report;
    } catch (error) {
      console.error("Error generating sales report:", error);
      throw error;
    }
  }
  
  
  
}
