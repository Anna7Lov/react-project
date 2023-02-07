export interface AdvantageItem {
  id: number;
  number: string;
  text: string;
  additionalClass: string;
}

export interface MasonryImageItem {
  id: number;
  image: string;
  alt: string;
}

export interface BreakpointItem { [breakpoint: string]: number }

export interface DropDownItem {
  id: number;
  title: string;
  list: Array<{
    id: number;
    value: string;
    name: string;
  }>;
}

export interface EditPasswordFormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface EditDataFormValues {
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface socialMediaItem {
  id: number;
  name: string;
  address: string;
}

export interface LinkItem {
  id: number;
  name: string;
  address: string;
}

export interface PartnerItem {
  id: number;
  logo: string;
  alt: string;
  class: string;
}

export interface AuthorizationFormValues {
  email: string;
  password: string;
}

export interface RegistrationFormValues {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
