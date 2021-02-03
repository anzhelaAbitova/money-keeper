import { IClientData } from '../clients/types';
import { IServiceData } from '../services/types';

export interface IInvoicesState {
  invoices?: IInvioceData[];
  statuses: string[];
}

export interface IInvioceData {
  number?: string;
  dateStart?: Date | string;
  dateEnd?: Date | string;
  datePay?: Date | string;
  client?: IClientData;
  jobs?: IInvoiceJob[];
  price?: number | string;
  status?: string;
}

export interface IInvoiceJob {
  count: number,
  service?: IServiceData,
}
