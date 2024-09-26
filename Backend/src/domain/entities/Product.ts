import mongoose from "mongoose";


// src/domain/entities/Product.ts
export class Product {
    public _id: string |mongoose.Types.ObjectId;
    public title: string;
    public description: string;
    public price: number;
    public inventory: number;
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(
      _id: string |mongoose.Types.ObjectId,
      title: string,
      description: string,
      price: number,
      inventory: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this._id = _id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.inventory = inventory;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    // Example of domain-specific business logic
    adjustInventory(amount: number): void {
      if (this.inventory + amount < 0) {
        throw new Error("Not enough inventory to adjust by the specified amount");
      }
      this.inventory += amount;
      this.updatedAt = new Date();
    }
  
    // You can also add methods like:
    isOutOfStock(): boolean {
      return this.inventory === 0;
    }
  }
  