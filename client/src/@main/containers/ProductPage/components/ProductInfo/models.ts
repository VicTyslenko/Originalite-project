export type ProductInfoProps = {
  id: string;
  name: string;
  productUrl?: string;
  currentPrice: number;
  colors?: {
    color: string;
    hash: string;
  }[];
  sizes?: string[];
  productDetails?: string;
  productDelivery?: string;
};
