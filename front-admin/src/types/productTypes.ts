import { Category } from "./categoryType";


export interface Description {
    header: string;
    content: string;
  }
  
 export interface Variant {
    weight: string;
    price: number;
    stockQuantity: number;
  }
  
  // Define the Product interface
  export  interface Product {
    _id:string
    name: string;
    descriptions: Description[];
    isListed: boolean;
    category: Category | null;
    images: File[];
    variants: Variant[];
  }
  
  
  