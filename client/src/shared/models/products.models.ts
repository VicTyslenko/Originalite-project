export interface ProductData {
  _id?: string;
  itemNo: string;
  enabled: boolean;
  name: string;
  currentPrice: number;
  previousPrice?: number;
  male: string;
  categories: string;
  imageUrls: string[];
  quantity: number;
  colors?: string[];
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
