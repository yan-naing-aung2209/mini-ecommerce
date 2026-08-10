import { Order } from "../../generated/prisma/client";
import { CartItem } from "./cart";

export interface OrderState {
  items: Order[];
  loading: boolean;
  error: Error | null;
}

interface PayloadOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateOrderPayload extends PayloadOption {
  payload: CartItem[];
}
export interface DeleteOrderPayload extends PayloadOption {
  orderId: string;
}
