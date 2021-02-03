export interface IFeaturesCard {
  title?: string;
  text?: string;
  image?: string;
}

export interface IAppInput {
  label?: string;
  type: string;
  name: string;
  value?: string | null;
  placeholder?: string;
  hasBlurCheck?: boolean;
  minLength: number;
}

export interface IAppCheckbox {
  label?: string;
  checked?: boolean;
  name: string;
  id?: string;
  // value?: string | null;
}

export interface IAppRadiobox {
  items: string[];
  name: string;
  id?: string;
  current?: number;
}
