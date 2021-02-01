export interface IModalState {
  modalComponentName: string;
  modalState: boolean;
  modalParams: IModalParams;
  modalHeight?: string;
  cb?: Function;
}

export interface IModalParams {
  active?: number;
  confirm?: boolean;
  actionTitle?: string;
  cb?: Function;
}
