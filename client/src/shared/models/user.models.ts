export type UserData = {
  address?: string;
  birthday?: string;
  customerNo?: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  login: string;
  password: string;
  telephone?: string;
  isAdmin: boolean;
  _id: string;
};

export interface UserModels {
  success: boolean;
  token: string;
  data: UserData | null;
}
