type Colors = {
  color: string;
  hash: string;
};

export interface ProductData {
  _id: string;
  itemNo: string;
  enabled: boolean;
  name: string;
  currentPrice: number;
  previousPrice?: number;
  male: string;
  categories: string;
  imageUrls: string[];
  quantity: number;
  colors?: Colors[];
  sizes?: string[];
  productDetails?: string;
  productDelivery?: string;
  productUrl?: string;
  brand?: string;
  sellerseller?: string;
  date?: string | Date;
}

export interface ProductModels {
  cartQuantity: number;
  color: string;
  product: ProductData;
  size: string;
  _id: string;
}
