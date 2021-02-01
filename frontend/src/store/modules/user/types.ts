export interface IUserState {
  token: string | null;
  user: string;
  request?: boolean;
  avatar?: string;
  name?: string;
  status?: string;
  position?: string;
}
