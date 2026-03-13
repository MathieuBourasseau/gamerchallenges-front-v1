import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Challenge } from "../../types/models";
import H1Title from "../../ui/H1Title";
import ReactPlayer from 'react-player'

type ApiReponse = Challenge & { error?: string };

export default function ParticipationsByChallenge() {

    // --- Get id from params --- 
    const { id } = useParams();

    // --- STATES INITIALIZATION --- 
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [error, setError] = useState<string | null>(null);

    // --- SHOW PARTICIPATIONS IF EXISTING --- 
    useEffect(() => {

        const fetchParticipations = async () => {

            const API_URL = import.meta.env.VITE_API_URL;

            setChallenge(null);
            setError(null);

            try {

                const response = await fetch(`${API_URL}/challenges/${id}/participations`);
                const data: ApiReponse = await response.json();
                console.log("Données reçues:", data);

                // Check the server answer
                if (!response.ok) {
                    throw new Error(data.error || "Impossible d'afficher les participations.")
                };

                // update participation state
                setChallenge(data);

            } catch (error) {

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Le serveur ne répond pas. Veuillez réessayer plus tard.")
                };

            }

        }

        if (id) fetchParticipations();

    }, [id])

    // Checking that the challenge has participations
    const hasParticipation = (challenge?.participations?.length ?? 0) > 0

    return (
        <section
            className="p-2"
        >
            <H1Title
                size={"h1-mobile"}
            >
                Participations au challenge : {challenge?.name}
            </H1Title>

            <div
                className="
                grid grid-cols-1 gap-6 w-[90%] max-w-[370px] mx-auto
                md:grid-cols-2 md:max-w-[600px] md:gap-12
                lg:grid-cols-3 lg:max-w-[1200px]"
            >

                {hasParticipation ? (

                    challenge?.participations?.map((part) => (

                        <div
                            key={part.id}
                            className="flex flex-col gap-2 "
                        >
                            <div
                               
                                className="border border-green-light rounded-lg overflow-hidden relative aspect-video w-full"
                            >
                                <ReactPlayer
                                    src={part.url}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    className="absolute top-0 left-0"
                                />
                            </div>
                            <div
                                className="
                                    flex flex-col items-center text-p-mobile
                                    md:text-p-tablet
                                    "
                            >
                                <p>{part.title}</p>
                                <p>Posté par : {part.player?.username}</p>
                            </div>
                        </div>




                    ))


                ) : (
                    <div>
                        <p>Il n'y aucune participation actuellement à ce challenge.</p>
                    </div>
                )}
            </div>

        </section>

    )
}
