import { Product } from "../../generated/prisma/client";

export interface CartItem extends Product {
  Qty: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: Error | null;
}
