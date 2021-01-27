export interface IModalState {
  modalComponentName: string;
  modalState: boolean;
  modalParams: IModalParams;
}

export interface IModalParams {
  active?: number;
}
