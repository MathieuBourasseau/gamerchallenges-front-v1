import React, { useEffect, useState } from 'react'
import type { Game, Challenge, User, Participation } from "../../types/models"
import { useParams } from "react-router-dom"

type ApiResponse = Challenge & { error?: string };

export default function ChallengeDetails() {

    // ---- Get id from params ----
    const { id } = useParams();

    // ---- STATES INITIALIZATION ----
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [error, setErrors] = useState<string | null>(null);

    // ---- SHOW THE CHALLENGE SELECTED ----
    useEffect(() => {

        // Fetch API to show challenge
        const fetchChallenge = async () => {

            const API_URL = import.meta.env.VITE_API_URL;

            setErrors(null);
            setChallenge(null);

            try {

                const response = await fetch(`${API_URL}/challenges/${id}`);
                const data: ApiResponse = await response.json();

                // Checking the server answer
                if (!response.ok) {
                    throw new Error(data.error || "Impossible d'afficher ce challenge.")
                };

                setChallenge(data);

            } catch (error) {

                if (error instanceof Error) {
                    setErrors(error.message);
                } else {
                    setErrors("Le serveur ne répond pas. Veuillez réessayer plus tard.");
                }
            }
        };
        
        if (id) fetchChallenge();
        
    }, [id])


    return (
        <div>

        </div>
    )
}
