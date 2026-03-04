import type { ContactFormData, FormErrors } from "../types/forms";

// Function to check if a field is empty
const isEmpty = (value : string) => value.trim().length === 0;

// Function to check if email is invalid
const isEmailInvalid = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
}

// Function to validate data from Contact form
export function validateContactForm(
    data : ContactFormData, isPolicyAccepted : boolean) : FormErrors<ContactFormData> {

    const errors : FormErrors<ContactFormData> = {};

    if(isEmpty(data.name)){
        errors.name = "Le champ nom est vide."
    };

    if(isEmailInvalid(data.email)){
        errors.email = "L'email est incorrect."
    };

    if(isEmpty(data.message)){
        errors.message= "Le champ message est vide."
    };

    if(!isPolicyAccepted){
        errors.isChecked = "Vous devez accepter la politique de confidentialité."
    }

    return errors;

};