export interface ICompanyState {
  settings?: ICompanySettings;
  data?: ICompanyData;
}

export interface ICompanySettings {
  signature?: string;
}

export interface ICompanyData {
  companyName?: string;
  bussinesType?: string;
  inn?: string;
  kpp?: string;
  address: {
    zipCode?: string;
    sity?: string;
    streat?: string;
    phone?: string;
  },
  bank: {
    account?: string;
    bik?: string;
    name?: string;
    kor?: string;
  },
  menegment: {
    bossName?: string;
    bossPosition?: string;
    buhName?: string;
    buhPosition?: string;
  },
}

