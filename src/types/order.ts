import { Order } from "../../generated/prisma/client";

export interface OrderState {
  items: Order[];
  loading: boolean;
  error: Error | null;
}
