export type DiscountProps = {
  code: string;
  expiresAt: string;
  isActive: boolean;
  minOrderValue: number;
  type: "percentage" | "fixed";
  usageLimit: number;
  usedCount: number;
  value: number;
};

export type InitialProps = {
  discount: string;
};
