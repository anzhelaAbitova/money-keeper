export interface IServicesState {
  services?: Array<IServiceData>;
}

export interface IServiceData {
  articul?: string;
  description?: string;
  price?: number | string;
  name?: string;
}
