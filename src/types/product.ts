import { Product } from "../../generated/prisma/client";

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: Error | null;
}
