export type InitialProps = {
  card: string;
  cardName: string;
  month: string;
  year: string;
  cvv: string;
};

export type SubmitPaymentProps = {
  values?: InitialProps;
  resetForm: () => void;
};
