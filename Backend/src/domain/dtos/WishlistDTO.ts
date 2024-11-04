// src/domain/dtos/WishlistDTO.ts

export interface WishlistDTO {
    userId: string;
    items: {
        productId: string;
        variantId: string; 
    }[];
}

export interface AddToWishlistDTO {
    userId: string;
    variantId: string;
    productId: string;
}

export interface RemoveFromWishlistDTO {
    userId: string;
    productId: string;
    variantId: string; 
}
