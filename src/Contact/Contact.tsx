import React, { useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import type { ContactFormData, FormErrors } from "../types/forms";
import { validateContactForm } from "../utils/validation";
import Input from "../ui/Input";
import ErrorSummary from "../ui/ErrorSummary";
import SuccessMessage from "../ui/SuccessMessage";
import { sendContactMessage } from "../Services/contactService";

export default function Contact() {

    // Form data secured with ContactFormData type
    // Form data is empty by default 
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });

    // Handle navigation
    const navigate = useNavigate();

    // Success message
    const [success, setSuccessMessage] = useState<string>('');

    // Errors messages
    const [errors, setErrors] = useState<FormErrors<ContactFormData>>({});

    // Accept or not data management policy 
    // By default data policy is not accepted
    const [isChecked, setIsChecked] = useState<boolean>(false);

    // --- UPDATE VALUES IN FORM ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        // Get the value and the input name from event
        const { name, value } = e.target;

        // Update formData with the new value in the input targeted 
        setFormData(formData => ({
            ...formData, // previous data in form data
            [name]: value
        }));
    };

    // --- HANDLE FORM SUBMIT --- 
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

        // Stop the default settings of form
        e.preventDefault();

        // Clear errors state with empty object
        setErrors({});

        // Check if data are valid
        const result = validateContactForm(formData, isChecked)

        // Update the state of error only if there is an error
        // Stop the code 
        if (Object.keys(result).length > 0) {
            setErrors(result)
            return;
        };

        // --- FETCH DATA TO BACKEND --- 
        try {

            const data = await sendContactMessage(formData);

            // Show success message 
            setSuccessMessage(data.message);

            // Hide success message after few seconds 
            setTimeout(() => {
                setSuccessMessage('');
                navigate("/")
            }, 3000);

            // Empty form after form submit
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            // Put isChecked to its initial state
            setIsChecked(false);

            // create error if connection to server is broken
        } catch (error) {

            // Checking if the error is from instance Errror
            if (error instanceof Error) {
                setErrors({ server: error.message });

            } else {
                // If the error does not come from Error Instance
                setErrors({ server: "Une erreur de serveur est survenue." });
            }
            return;
        };
    };

    // --- HANDLE CHECKED ---
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement
        setIsChecked(target.checked)
    };

    return (

        <section
            className="flex flex-col py-2 gap-2 items-center justify-center mx-auto min-h-screen w-full"
        >

            <form
                className="
                    flex flex-col gap-6 text-p-mobile bg-green-dark text-white p-4 my-2 rounded-2xl border-green-light border-2 border-green-light
                    md:text-p-tablet
                    lg:w-full lg:max-w-[600px]
                    "
                onSubmit={handleSubmit}
            >
                <h1
                    className="
                    text-h1-mobile italic uppercase font-bold text-white drop-shadow-title-glow text-center
                    md:text-h1-tablet
                    lg:text-h1-desktop
                "
                >
                    Contactez-nous
                </h1>
                <fieldset
                    className="w-full
                        lg:max-w-[80%] lg:mx-auto
                    "
                >
                    <div
                        className="flex flex-col gap-4 w-full"
                    >

                        {/* Name input */}
                        <Input
                            type="text"
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                        />

                        {/* Mail input */}

                        <Input
                            type="email"
                            placeholder="mail@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                        />

                        {/* Message input */}
                        <Input
                            placeholder="Mon message"
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            isTextArea
                        />


                        {/* Data management policy */}
                        <div
                            className="flex items-center text-xs"
                        >
                            <Input
                                type="checkbox"
                                onChange={handleChecked}
                                width="w-auto"
                            />

                            <span>
                                J'accepte la politique de confidentialité.
                            </span>
                        </div>

                        <Button
                            label="Valider"
                            type="submit"
                        />
                    </div>
                </fieldset>
            </form>

            <Button
                label="Retour à l'accueil"
                type="button"
                width="max-w-none"
                rounded="rounded-full"
                onClick={() => navigate("/")}
            />

            {/* Success message */}

            <SuccessMessage success={success} />

            {/* Error messages */}
            <ErrorSummary errors={errors} />

        </section>
    )
}
