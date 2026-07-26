import { Product } from "../../generated/prisma/client";

export interface ProductState {
  items: Product[];
  singleItem: Product | null;
  loading: boolean;
  error: Error | null;
}
