

// Define an interface that extends Document
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface product{
    _id:string,
    title:string,
    description:string,
    price:number,
    inventory:number,
    createdAt:Date,
    updatedAt:Date
}