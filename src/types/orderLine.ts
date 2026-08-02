import { OrderLine } from "../../generated/prisma/client";

export interface OrderLineState {
  items: OrderLine[];
  loading: boolean;
  error: Error | null;
}
