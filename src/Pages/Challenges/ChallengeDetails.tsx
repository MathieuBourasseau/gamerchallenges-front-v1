import React, { useEffect, useState } from 'react'
import type { Game, Challenge, User, Participation } from "../../types/models"
import { useParams } from "react-router-dom"
import Image from "../../ui/Image";
import H1Title from "../../ui/H1Title";

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
                console.log("données reçues:", data)

                // Checking the server answer
                if (!response.ok) {
                    throw new Error(data.error || "Impossible d'afficher ce challenge.")
                };

                // Get the raw data date from sequelize and transform it in Date object
                const rawDate = new Date(data.created_at);

                // Format the date in french 
                const formattedDate = new Intl.DateTimeFormat('fr-FR').format(rawDate).replaceAll('/', '.');

                // Assign this new value to the key 
                data.created_at = formattedDate;

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

    if (!challenge) {
        return (
            <p>Chargement en cours</p>
        )
    }
    return (
        <section
            className="py-2 px-2"
        >
            {/* Container div */}
            <div
                className="
                     border-1 border-green-light rounded-xl text-p-mobile p-2
                "

            >

                <div
                    className="flex flex-col gap-3"
                >
                    <Image
                        src={challenge.game?.cover || ""}
                        alt={challenge?.name}
                    />
                    <H1Title
                        size={"h1-mobile"}
                        flex="flex flex-col"
                    >
                        {challenge.name}
                        <span
                            className="
                                text-sm font-normal
                                md:text-p-tablet
                                lg:text"
                        >
                            {challenge.created_at}
                        </span>
                    </H1Title>

                </div>
                {/* DESCRIPTION AND LIKES PART */}
                <div>
                    <p>{challenge.description}</p>
                </div>
            </div>
        </section>
    )
}
