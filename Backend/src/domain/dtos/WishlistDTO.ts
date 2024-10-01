// src/domain/dtos/WishlistDTO.ts

export interface WishlistDTO {
    userId: string;
    productIds: string[];
}

export interface AddToWishlistDTO {
    userId: string;
    productId: string;
}

export interface RemoveFromWishlistDTO {
    userId: string;
    productId: string;
}
