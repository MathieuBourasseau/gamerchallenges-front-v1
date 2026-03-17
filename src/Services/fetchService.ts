import { useAuth } from "../hooks/useAuth";
import type { ContactFormData, ParticipationInputs } from "../types/forms";

export const sendContactMessage = async (dataForm: ContactFormData) => {

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;

    // Headers data for fetch
    const headersContent = { "Content-Type": "application/json" }

    // Body content for fetch
    const bodyContent = JSON.stringify(dataForm);

    const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: headersContent,
        body: bodyContent,
    });

    const data = await response.json();

    // Checking the server answer
    if (!response.ok) {
        console.error("Erreur lors de l'envoi du message dans le formulaire de contact :", data.error);
        throw new Error(data.error || "Impossible de se connecter au serveur.");
    };

    // Return data in case of success
    return data;
}

export const shareParticipation = async (dataForm: ParticipationInputs, token: string) => {

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;

    // Headers data for fetch
    const headersContent = { 
        "Content-Type": "application/json", 
        "authorization" : `Bearer ${token}`
    }

    // Body content for fetch
    const bodyContent = JSON.stringify(dataForm);

    const response = await fetch(`${API_URL}/participations/share`, {
        method: "POST",
        headers: headersContent,
        body: bodyContent,
    });

    const data = await response.json();

    // Checking the server answer
    if (!response.ok) {
        console.error("Erreur lors de l'envoi de la participation.", data.error);
        throw new Error(data.error || "Impossible de se connecter au serveur.");
    };

    // Return data in case of success
    return data;
}
