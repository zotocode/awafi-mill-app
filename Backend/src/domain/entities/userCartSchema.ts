export class CartItem {
    constructor(
        readonly productId: string,
        readonly quantity: number,
        readonly price: number,
    ) {}
    
    
    public static newCartItem(productId: string, quantity: number, price: number) {
        return new CartItem(productId, quantity, price);
    }
}

export class Cart {
    constructor(
        readonly userId: string,
        readonly items: CartItem[],
        readonly totalPrice: number,
    ) {}

    // Static method to create a new cart
    public static newCart(
        userId: string,
        items: CartItem[],
        totalPrice: number,
    ) {
        return new Cart(userId, items, totalPrice);
    }

    // Optional method to recalculate total price
    public calculateTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}
