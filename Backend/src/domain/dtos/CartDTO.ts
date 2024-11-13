// src/domain/dtos/CartDTO.ts
export interface CartDTO {
    userId: string;
    items: { productId: string; variantId: string; quantity: number }[];
}

export interface AddToCartDTO {
    userId: string;
    productId: string;
    variantId: string;
    quantity: number;
}

export interface UpdateCartQuantityDTO {
    userId: string;
    productId: string;
    variantId: string;
    quantity: number;
}

export interface RemoveFromCartDTO {
    userId: string;
    productId: string;
    variantId: string;
}

interface IProductDetails {
    productId: string;
    variantId: string;
    name: string;
    weight: string;
    quantity: number;
    inPrice: number;
    outPrice: number;
    images: string;
    stockQuantity: number;
    rating: number;
  }
  
 export type IUserCartReturnDTO = IProductDetails[];
  