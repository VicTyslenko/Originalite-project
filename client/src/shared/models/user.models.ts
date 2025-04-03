export interface UserData {
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
  // _id: string;
  id: string;
  date?: string | Date;
}

export interface UserModels {
  success: boolean;
  accessToken: string;
  data: UserData | null;
}
