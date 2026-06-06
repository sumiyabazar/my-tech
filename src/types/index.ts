export interface Product {
  id: number;
  name: string;
  category: string;
  specs: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; delta: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

export type CheckoutStep = 'cart' | 'checkout' | 'success';

export type PaymentMethod = 'qpay' | 'socialpay' | 'bank';
