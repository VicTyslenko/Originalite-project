export type OrderProps = {
  orderId: string;
  params: {
    email: string;
    letterSubject: string;
    letterHtml: string;
    paymentStatus: string;
  };
};
