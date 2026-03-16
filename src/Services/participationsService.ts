import type { ParticipationInputs } from "../types/forms";

export const sendParticipation = async (dataForm: ParticipationInputs) => {

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
        console.error("Erreur lors de l'envoi de la participation", data.error);
        throw new Error(data.error || "Impossible de se connecter au serveur.");
    };

    // Return data in case of success
    return data;
}