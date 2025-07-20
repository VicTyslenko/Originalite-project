export type DiscountProps = {
  // code: string;
  expiresAt: string;
  isActive: boolean;
  exp:string,
  type: "percentage" | "fixed";
  // usageLimit: number;
  // usedCount: number;
  value: number;
};

export type InitialProps = {
  discount: string;
};

export type SubmitProps = {
  values: InitialProps;
  resetForm: () => void;
  setFieldError: (field: string, message: string | undefined) => void;
};
