export const LocalStorage = {
  setKeepSignIn: (value: string) => localStorage.setItem("keepSignedIn", value),

  removeKeepSignIn: () => localStorage.removeItem("keepSignedIn"),

  getKeepSignIn: () => localStorage.getItem("keepSignedIn") === "true",

  removeRoot: () => localStorage.removeItem("root"),
};
