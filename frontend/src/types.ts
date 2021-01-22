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
