import type { ProductData } from "shared/models/products.models";

export type ProductMoreProps = Pick<ProductData, "name" | "itemNo" | "currentPrice" | "_id"> & { url?: string };
