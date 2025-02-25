// src/presentation/controllers/orderController.ts
import { NextFunction, Request, Response } from "express";
import IOrderInteractor from "../../interface/orderInterface/IOrderInteractor";
import { CreateOrderDTO, OrderDTO, UpdateOrderStatusDTO } from "../../domain/dtos/OrderDto";
import mongoose from 'mongoose'

export class OrderController {
  private orderInteractor: IOrderInteractor;

  constructor(orderInteractor: IOrderInteractor) {
    this.orderInteractor = orderInteractor;
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
    
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
  
      const orderData: CreateOrderDTO = {
        ...req.body,
        user:userId
      };

      const newOrder = await this.orderInteractor.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        status = null,
        page = 1,
        limit = 10,
        paymentStatus = null,
        orderId = null,
      } = req.query;
  
      const orders = await this.orderInteractor.getOrders({
        page: Number(page) ?? 1,
        limit: Number(limit) ?? 10,
        status: status ? String(status) : null,
        paymentStatus: paymentStatus ? String(paymentStatus) : null,
        orderId: orderId ? String(orderId) : null,
      });
  
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
  

  async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderIdentifier = new mongoose.Types.ObjectId(req.params.id);


      const order = await this.orderInteractor.getOrderById(orderIdentifier);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }



  async updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
     
      const orderIdentifier = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
      
     const {trackingId}= req.body
  
      const updateData: UpdateOrderStatusDTO = {
        orderId: orderIdentifier, // Using the new ObjectId
        orderStatus: req.body.orderStatus,
        trackingId:trackingId==undefined ? ' ':trackingId
      };

    
   
      const updatedOrder = await this.orderInteractor.updateOrderStatus(updateData);
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }


  async actionOnReturnOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const orderId = req.params.id;
      const { productId,variantId,returnStatus } = req.body;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    
      const result = await this.orderInteractor.actionOnReturnOrder(orderId,req.body);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json({ result});
    } catch (error) {
      next(error);
    }
  }
  

  async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderId = req.params.id;

      const {reason}=req.body
      const result = await this.orderInteractor.cancelOrder(orderId,reason);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { status, page = 1, limit = 10 } = req.query;
      const orders = await this.orderInteractor.getUserOrders({
        userId,
        status: status as string,
        page: Number(page),
        limit: Number(limit)
      });

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const orderId = req.params.id;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const order = await this.orderInteractor.getUserOrderById(orderId, userId);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async cancelUserOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const orderId = req.params.id;
      const { reason } = req.body;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    
      const result = await this.orderInteractor.cancelUserOrder(orderId, userId, reason);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json({ message: "Order cancelled successfully", reason });
    } catch (error) {
      next(error);
    }
  }
  async returnUserOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const orderId = req.params.id;
      const { returnReason,productId,variantId } = req.body;

      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    
      const result = await this.orderInteractor.returnUserOrder(orderId, userId,req.body);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.status(200).json({ result});
    } catch (error) {
      next(error);
    }
  }
 
}
