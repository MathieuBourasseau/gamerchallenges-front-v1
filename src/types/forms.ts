// Input required in all forms
export type BaseUserInputs = {
    email: string;
    nickname?: string; // Only for login and register form
}

// Inputs required in Contact form
export type ContactUserInputs = {
    name: string;
    message: string;
}

// Inputs required in Login and register form
export type LoginUserInputs = {
    password: string;
}

// Merged BaseUserInputs with ContactUserInputs to export only one type
export type ContactFormData = BaseUserInputs & ContactUserInputs;