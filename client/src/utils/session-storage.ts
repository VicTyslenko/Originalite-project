export const SessionStorage = {
  getDiscount: () => sessionStorage.getItem("discount-value"),

  removeDiscount: () => sessionStorage.removeItem("discount-value"),

  setDiscount: (value: string) => sessionStorage.setItem("discount-value", value),
};
