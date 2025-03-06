export type RegisterProps = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginProps = {
  loginOrEmail: string;
  password: string;
  keepSignedIn: boolean;
};
