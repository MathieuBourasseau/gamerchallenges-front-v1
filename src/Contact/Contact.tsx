import React, { useState } from "react";
import { BiSolidMessageAltError } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import type { ContactFormData } from "../types/forms";

export default function Contact() {

    // Form data secured with ContactData type
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
    const [errors, setErrors] = useState<Partial<ContactData>>({});

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

        // Empty object to handle error message 
        // Partial makes optional the types required in ContactData
        let errorMessage: Partial<ContactData> = {};

        // Clean data from form
        const name = formData.name.trim();
        const email = formData.email.trim();
        const message = formData.message.trim();

        // Checking if the name field is valid 
        if (name.length === 0) {
            errorMessage.name = "Le champ nom est vide."
        };

        // Checking if the email is valid 
        if (email.length === 0) {
            errorMessage.email = "Le champ email est vide."
        };

        // Checking if the field message is valid
        if (message.length === 0) {
            errorMessage.message = "Le champ message est vide."
        };

        // Checking that data management policy is accepted 
        if (!isChecked) {
            errorMessage.isChecked = "Vous devez accepter la politique."
        }

        // Update the state of error only if there is an error
        // Stop the code 
        if (Object.keys(errorMessage).length > 0) {
            setErrors(errorMessage)
            return;
        };

        // Data from form
        const bodyContent = JSON.stringify(formData);

        // Headers data for fetch
        const headersContent = { "Content-Type": "application/json" }

        // --- FETCH DATA TO BACKEND --- 
        try {

            // Api url 
            const apiUrl = import.meta.env.VITE_API_URL;

            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: headersContent,
                body: bodyContent,
            });

            const data = await response.json();

            // Check the server response
            if (!response.ok) {
                console.error("Erreur lors de l'envoie du message", data.error)
                errorMessage.data = data.error;
                setErrors(errorMessage)
                return
            };

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
            errorMessage.data = "Impossible de se connecter au serveur."
            setErrors(errorMessage)
            return
        };
    };

    // --- HANDLE CHECKED ---
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
    };

    // --- SHOW ERROR MESSAGES --- 
    const showErrors = () => {
        return Object.values(errors).map((msg, i) => (
            <div
                key={i}
                className="flex justify-between items-center gap-2 border-2 border-red-dark bg-red-medium rounded-r-full py-2 px-4 text-xs"
            >
                <span>{msg}</span>
                <BiSolidMessageAltError />
            </div>
        ))
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

                        {/* Name field */}
                        <input
                            type="text"
                            placeholder="Nom"
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
                            className="bg-black-dark py-2 px-4 rounded-full w-full"
                        />

                        {/* Mail field */}
                        <input
                            type="email"
                            placeholder="mail@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            className="bg-black-dark py-2 px-4 rounded-full w-full"
                        />

                        {/* Message field */}
                        <textarea
                            placeholder="Votre message"
                            value={formData.message}
                            onChange={handleChange}
                            name="message"
                            className="bg-black-dark py-2 px-4 rounded-lg h-[150px] w-full"
                        />

                        {/* Data management policy */}
                        <div
                            className="flex items-center justify-center gap-6 w-full"
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChecked}
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

             {/* Success message if existing */}
                {success && (
                    <div
                        className="fixed left-0 top-40 flex gap-2 border-2 border-green-light rounded-r-full py-2 px-4 text-xs bg-green-medium"
                    >
                        <p>{success}</p>
                        <FaCircleCheck />
                    </div>
                )}

            {/* Error messages if existing */}
            {Object.keys(errors).length > 0 && (
                <div
                    className="fixed left-0 top-10 flex flex-col gap-2"
                >
                    {showErrors()}
                </div>
            )}

        </section>
    )
}
