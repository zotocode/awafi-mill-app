import { Category } from "./categoryType";


export interface Description {
    header: string;
    content: string;
  }
  
 export interface Variant {
    weight: string;
    inPrice: string;
    outPrice:string;
    stockQuantity: string;
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
  
  
  