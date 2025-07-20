export const SessionStorage = {
  setDiscountToken: (value: string) => sessionStorage.setItem("discount-token", value),

  getDiscountToken: () => sessionStorage.getItem("discount-token"),

  removeToken: () => sessionStorage.removeItem("discount-token"),
};
