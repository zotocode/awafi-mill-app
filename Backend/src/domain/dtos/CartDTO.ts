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
