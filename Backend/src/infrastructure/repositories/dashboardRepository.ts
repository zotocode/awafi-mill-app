// infrastructure/repositories/checkoutRepo.ts
import { Model } from "mongoose";
import { PipelineStage } from "mongoose";
import ICheckoutRepo from "../../interface/checkoutInterface/IcheckoutRepo"; 
import { CheckoutDTO,OrderSummary,RevenueSummary,CheckoutCreateDTO} from "../../domain/dtos/CheckoutDTO";
import { ICheckout } from "../../domain/entities/checkoutSchema";
import { BaseRepository } from "./baseRepository";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,startOfYear,endOfYear } from 'date-fns'; 
import IDashboardRepository from "../../interface/dashboardInterface/IDashboardRepo";



export class DashboardRepository extends BaseRepository<ICheckout> implements IDashboardRepository {
  constructor(model: Model<ICheckout>) {
    super(model);
  }
  async topSellingProduct(): Promise<any[]> {

      const result = await this.model.aggregate([
        { $match: { orderStatus: { $in: ['delivered', 'shipped'] } } },
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productId",
            totalQuantity: { $sum: "$items.quantity" },
            productName: { $first: "$items.name" },
            images: { $first: "$items.images" }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5}
      ]);
  
      return result;
 
  }
  
 


  async viewAllOrders(): Promise<OrderSummary[]> {
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
  


  async viewRevenue(period: 'day' | 'month' | 'year'): Promise<{ totalRevenue: number; data: RevenueSummary[] }> {
    try {
      const now = new Date();
      let matchCondition: any = {
        paymentStatus: 'completed',
        orderStatus: 'delivered',
      };
      let groupBy: any;
      let startDate: Date;
      let endDate: Date;
      let labels: string[] = [];
  
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
  
      if (period === 'day') {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
        endDate = endOfDay(now);
        matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
        groupBy = { dayOfWeek: { $dayOfWeek: '$orderPlacedAt' } };
  
        // Labels for days of the week
        labels = [...Array(7)].map((_, i) => days[(startDate.getDay() + i) % 7]);
      } else if (period === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of current month
        matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
        groupBy = { month: { $month: '$orderPlacedAt' }, year: { $year: '$orderPlacedAt' } };
  
        // Labels for months
        labels = [...Array(12)].map((_, i) => {
          const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
          return months[date.getMonth()];
        });
      } else if (period === 'year') {
        startDate = new Date(now.getFullYear() - 3, 0, 1);
        endDate = endOfYear(now);
        matchCondition.orderPlacedAt = { $gte: startDate, $lte: endDate };
        groupBy = { year: { $year: '$orderPlacedAt' } };
  
        // Labels for years
        labels = [...Array(4)].map((_, i) => `${startDate.getFullYear() + i}`);
      }
  
      // Aggregation pipeline
      const data = await this.model.aggregate([
        { $match: matchCondition },
        {
          $group: {
            _id: groupBy,
            totalRevenue: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            period: '$_id',
            totalRevenue: 1,
            count: 1,
          },
        },
      ]);
  
      // Calculate total revenue
      const totalRevenue = data.reduce((sum, item) => sum + item.totalRevenue, 0);
  
      // Map data to include all labels, filling gaps with default values
      const result = labels.map((label, index) => {
        const found = data.find((item) => {
          if (period === 'day') {
            return days[item.period.dayOfWeek - 1] === label; // Map dayOfWeek to name
          } else if (period === 'month') {
            return (
              item.period.month - 1 ===
                (startDate.getMonth() + index) % 12 &&
              item.period.year ===
                new Date(startDate.getFullYear(), startDate.getMonth() + index, 1).getFullYear()
            );
          } else if (period === 'year') {
            return label === `${item.period.year}`;
          }
        });
  
        return found || { period: label, totalRevenue: 0, count: 0 };
      });
  
      // Replace numeric dayOfWeek in period with day name
      if (period === 'day') {
        result.forEach((item) => {
          if (typeof item.period === 'object' && item.period.dayOfWeek) {
            item.period = days[item.period.dayOfWeek - 1]; // Replace dayOfWeek number with name
          }
        });
      }
      if (period === 'month') {
        result.forEach((item) => {
          if (typeof item.period === 'object' && item.period.month) {
            item.period = months[item.period.month - 1]; // Replace month number with name
          }
        });
      }
  
      return { totalRevenue, data: result };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  

  async generateProductSalesReport(
    startDate: Date,
    endDate: Date,
    interval: 'day' | 'week' | 'month' | 'year'
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);


const testDocuments = await this.model.find().limit(5).exec();



const simpleQuery = await this.model.find({
  createdAt: { $gte: start, $lte: end }
}).exec();


  
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

export default DashboardRepository
