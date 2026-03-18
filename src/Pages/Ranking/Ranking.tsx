import { useEffect, useState } from "react";
import H1Title from "../../ui/H1Title";
import { FaHeart, FaTrophy } from "react-icons/fa";
import Image from "../../ui/Image";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

type RankingUser = {
    id: number;
    username: string;
    avatar: string;
    participationCount?: number;
    voteCount?: number;
};

export default function Ranking() {
    const [topParticipations, setTopParticipations] = useState<RankingUser[]>([]);
    const [topVotes, setTopVotes] = useState<RankingUser[]>([]);
    const [loading, setLoading] = useState(true);
    // 1. Changement du type de l'erreur
    const [error, setError] = useState<Partial<ApiErrorResponse>>({});

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchRankings = async () => {
       
            setError({});
            setLoading(true);

            try {
                
                const [participationsRes, votesRes] = await Promise.all([
                    fetch(`${API_URL}/ranking/participations`),
                    fetch(`${API_URL}/ranking/votes`),
                ]);

                // Checking response separately
                if (!participationsRes.ok) {
                    const errorData = await participationsRes.json();
                    throw errorData;
                }
                
                if (!votesRes.ok) {
                    const errorData = await votesRes.json();
                    throw errorData;
                }

                const participationsData = await participationsRes.json();
                const votesData = await votesRes.json();

                setTopParticipations(participationsData);
                setTopVotes(votesData);

            } catch (err: any) {
                console.error("Erreur de chargement des classements :", err);
               
				// Update errors
                setError({
                    statusCode: err.status || 500,
                    server: err.error || "Impossible de charger les classements."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, [API_URL]);

    if (loading && !error.server) return (
        <div className="flex justify-center mt-10">
            <p className="text-white animate-pulse">Chargement en cours...</p>
        </div>
    );

    const userCard = (user: RankingUser, index: number, isVote?: boolean) => {
        const isFirst = index === 0;

        return (
            <li
                key={user.id}
                className={`
                w-full border-3 border-green-medium rounded-3xl
                flex flex-col items-center gap-2 text-center
                shadow-md hover:shadow-lg transition-shadow bg-[var(--color-blue-dark)] text-white
                ${isFirst ? "max-w-[28rem] p-6 scale-105 md:scale-110" : "max-w-[20rem] p-4"} 
`} 
            >
                <div className="relative">
                    <div className="absolute inset-0 top-0 bottom-0 left-1/2 transform -translate-x-1/2 bg-green-light opacity-20 rounded-full blur-3xl"></div>
                    <Image
                        src={user.avatar}
                        alt={user.username}
                        className={`rounded-full relative z-10 object-cover ${isFirst ? "w-28 h-28" : "w-20 h-20"}`}
                    />
                </div>

                <span className="font-semibold">{user.username}</span>
                {isVote ? (
                    <span className="flex items-center gap-1 font-bold">
                        {user.voteCount} <FaHeart className="text-red-500" />
                    </span>
                ) : (
                    <span className="font-bold">{user.participationCount} participation(s)</span>
                )}
            </li>
        );
    };

    return (
        <div className="max-w-5xl mx-auto px-4 mt-5">
            <H1Title>CLASSEMENTS</H1Title>

            {/* Errors component */}
            <ErrorSummary errors={error} />

            {/* Conditionnal display */}
            {(!error.server || topParticipations.length > 0) && (
                <>
                    <h2 className="flex items-center justify-center gap-2 mb-4 text-white font-bold text-xl tracking-wider uppercase">
                        <FaTrophy className="text-yellow-500" /> Top participations
                    </h2>
                    
                    {topParticipations.length > 0 ? (
                        <ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                            {topParticipations.map((user, index) => userCard(user, index))}
                        </ul>
                    ) : (
                        <p className="text-center text-white opacity-50">Aucune donnée pour ce classement.</p>
                    )}

                    <h2 className="flex items-center justify-center gap-2 mt-12 mb-4 text-white font-bold text-xl tracking-wider uppercase">
                        <FaTrophy className="text-yellow-500" /> Top votes reçus
                    </h2>
                    
                    {topVotes.length > 0 ? (
                        <ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                            {topVotes.map((user, index) => userCard(user, index, true))}
                        </ul>
                    ) : (
                        <p className="text-center text-white opacity-50">Aucune donnée pour ce classement.</p>
                    )}
                </>
            )}

            <div className="flex justify-center mt-12 w-full">
                <Link to="/">
                    <Button label="Retour à l'accueil" type="button" />
                </Link>
            </div>
        </div>
    );
}