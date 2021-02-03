<<<<<<< HEAD
export interface IUserState {
  token: string | null;
  user: string;
  request?: boolean;
  data?: IUserData;
}

export interface IUserData {
  avatar?: string;
  name?: string;
  status?: string;
  position?: string;
  uid?: string;
=======
export interface IUser {
  avatar: string;
  name: string;
  status: string;
  position: string;
  email: string;
  token: string;
>>>>>>> develop
}
