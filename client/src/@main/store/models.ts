export type OrderProps = {
  orderId: string;
  params: {
    email: string;
    letterSubject: string;
    letterHtml: string;
    paymentStatus: string;
  };
};

export type ProductListParamsProps = {
  startPage: number;
  perPage: number;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  male: string | undefined;
  categories: string | null;
};
