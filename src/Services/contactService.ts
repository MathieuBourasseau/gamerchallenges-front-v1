// Faire un fetch des data du form
// On créé une fonction qui aura pour paramètre les données envoyées dans le formulaire
// On effectue le fetch classique

import type { ContactFormData } from "../types/forms";

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

    if (!response.ok) {
        console.error("Erreur lors de l'envoi du message dans le formulaire de contact :", data.error);
        throw new Error(data.error);
    };

    return data;
}