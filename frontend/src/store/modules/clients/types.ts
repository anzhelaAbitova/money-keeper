export interface IClientsState {
  clients?: IClientData[];
}

export interface IClientData {
  name?: string;
  address?: string;
  email?: string;
  contract?: string;
}
