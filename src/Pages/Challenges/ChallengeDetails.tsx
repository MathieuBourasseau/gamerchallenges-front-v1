import React, { useEffect, useState } from 'react'
import type { Challenge } from "../../types/models"
import { Link, useParams } from "react-router-dom"
import Image from "../../ui/Image";
import H1Title from "../../ui/H1Title";
import { FaHeart } from "react-icons/fa";
import Button from "../../ui/Button";
import ReactPlayer from 'react-player'
import H2 from "../../ui/H2";

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
            className="p-2"
        >
            {/* Container */}
            <article
                className="flex flex-col gap-6 border-3 border-green-light rounded-xl text-p-mobile items-center p-4
                lg:max-w-[1200px] lg:mx-auto lg:border-4 lg:rounded-3xl"

            >
                {/* Titles, date and image */}
                <div
                    className="flex flex-col gap-3 items-center"
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
                <div
                    className="flex flex-col items-center gap-4"
                >
                    <p
                        className="
                            text-p-mobile
                            md:text-p-tablet"
                    >{challenge.description}</p>
                    <div
                        className="
                            flex items-center gap-2
                            "
                    >
                        <span>{challenge.voteCounted}</span>
                        <FaHeart className="cursor-pointer text-white text-[18px]" />
                    </div>
                    <Button
                        label="uploader une vidéo"
                        type="button"

                    />
                </div>

                {/* PARTICIPATIONS */}
                <div
                    className="
                        flex flex-col gap-6 items-center max-w-[380px]
                        md:max-w-[600px]"
                >
                    <H2 label="Participations des autres joueurs" />
                    <div
                        className="grid grid-cols-2 gap-6"
                    >
                        {challenge.participations?.slice(0,2).map((part) => (
                            <div
                                key={part.id}
                                className="
                                    relative w-full border border-green-light rounded-lg overflow-hidden  h-[90px]
                                    md:h-[180px]"
                            >
                                {/* ReactPlayer component used to show video from youtube */}
                                <ReactPlayer
                                    src={part.url}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    className="absolute top-0 left-0"
                                />
                            </div>
                        ))}
                    </div>
                    <Link
                        to={`/challenges/${challenge.id}/participations`}
                        className={`
                            text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                            hover:bg-white hover:text-green-light hover:border-green-light
                            md:text-base
                        `}
                    >
                        Voir plus
                    </Link>

                </div>
            </article>

        </section>
    )
}
