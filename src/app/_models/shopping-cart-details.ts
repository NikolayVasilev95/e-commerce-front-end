import { Product } from './product';
import { ShoppingCart } from './shopping-cart';

export class ShoppingCartDetail {
    shopingCart: ShoppingCart;
    id: number;
    products: Product;
    quantity: number;
}
