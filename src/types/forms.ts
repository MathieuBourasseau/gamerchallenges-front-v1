// Input required in all forms
export type BaseUserInputs = {
  email: string;
  nickname?: string; // Only for login and register form
};

// Inputs required in Contact form
export type ContactUserInputs = {
  name: string;
  message: string;
};

// Inputs required in Login and register form
export type LoginUserInputs = {
  password: string;
};

// Input required to share participation 
export type ParticipationInputs = {
  title: string;
  url: string;
}

// Type for Login form data more specific
export type LoginFormData = {
  email: string;
  password: string;
};

// Type for Register form data with no need to put the avatar logic
export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  acceptPolicy: boolean;
  avatar?: File | null; // optional because the user can choose not to upload an avatar, its already handled in the service, also in the backend...
};

// Merged BaseUserInputs with ContactUserInputs to export only one type
export type ContactFormData = BaseUserInputs & ContactUserInputs;

// Type for errors in form
// <T> is a parameter it can be replaced by the form needed
// Partial make this type optional
// keyof allows to create an object from the form put in parameter
export type FormErrors<T> = Partial<Record<keyof T, string>> & {
  isChecked?: string;
  server?: string;
  statusCode?: number
};

export type ApiErrorResponse = {
  status?: number;
  error?: string;
}
