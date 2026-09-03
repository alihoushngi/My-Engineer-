export type SearchInputProps = {
  initialQuery: string;
  cities?: readonly string[];
  id?: string;
  requireQuery?: boolean;
  navigateOnClear?: boolean;
  autoFocus?: boolean;
  labelHidden?: boolean;
  onSubmitted?: () => void;
};
