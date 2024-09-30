// src/domain/dto/product.dto.ts

export interface ProductDTO {
  _id:string
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional
  weight: string;
  stockStatus: {
    quantity: number;
    status: "In Stock" | "Out of Stock";
  };
  categories?: string[]; // Optional
  images?: string[];
  variants?: { size: string; price: number; stockQuantity: number }[]; // Optional
}
export interface ProductCreationDTO {
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional
  weight: string;
  stockQuantity:number,
  status:"In Stock" | "Out of Stock",
  categories?: string[]; // Optional
  images?: string[];
  variants?: { size: string; price: number; stockQuantity: number }[]; // Optional
  createdAt?: Date;
  updatedAt?: Date;
}