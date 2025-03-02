export const LocalStorage = {
  deleteAuthToken: () => localStorage.removeItem("persist:auth"),
  deleteTempAuthToken: () => sessionStorage.removeItem("persist:tempAuth"),
};
