export const SessionStorage = {
  setDiscountToken: (value: string) => sessionStorage.setItem("discount-token", value),

  getDiscountToken: () => sessionStorage.getItem("discount-token"),

  removeToken: () => sessionStorage.removeItem("discount-token"),

  setActivateDiscount: (value: string) => sessionStorage.setItem("active-discount", value),

  getActivateDiscount: () => sessionStorage.getItem("active-discount"),

  
};
