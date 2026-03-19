import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../ui/Image";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";
import H2 from "../../ui/H2";
import type { Game } from "../../types/models";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<Partial<ApiErrorResponse>>({});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGame = async () => {
      // Clear errors
      setError({});

      try {
        const res = await fetch(`${API_URL}/games/${id}`);
        const data = await res.json();

        // Throw error object from back
        if (!res.ok) throw data;

        setGame(data);
      } catch (err: any) {
        console.error(err);
        setError({
          statusCode: err.status || 500,
          server: err.error || "Impossible d'afficher le jeu.",
        });
      }
    };

    if (id) fetchGame();
  }, [id, API_URL]);

  if (!game && !error.server) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-white animate-pulse">Chargement en cours...</p>
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-8">
      <ErrorSummary errors={error} />

      {game && (
        <div
          className="
                border-2 border-[var(--color-green-light)] rounded-2xl p-8
                md:max-w-[600px] md:mx-auto
                lg:max-w-[1000px] lg:border-4 lg:rounded-3xl lg:w-[75%]">
          <div className="flex flex-col md:flex-row gap-6">
            <Image src={game.cover} alt={game.title} />

            <div className="flex flex-col gap-3">
              <H2>{game.title}</H2>

              <p className="text-white">{game.description}</p>

              <div className="flex gap-3 text-white font-bold">
                <span>{new Date(game.release_year).getFullYear()} </span>
                <span>{game.genre}</span>
              </div>
            </div>
          </div>

          <div className="my-8 h-[3px] bg-white" />

          <div className="flex flex-col gap-6">
            <h3 className="text-center text-xl font-semibold text-white tracking-wider">
              CHALLENGES
            </h3>

            {game.challenges?.map((challenge) => (
              <Link
                to={`/challenges/${challenge.id}`}
                key={challenge.id}
                className="flex items-center justify-between border-2 border-[var(--color-green-light)] bg-[var(--color-blue-dark)] rounded-md px-6 py-3">
                <span className="text-white">{challenge.name}</span>

                <div className="flex items-center gap-2 text-white font-bold">
                  <span>{challenge.totalVotes ?? 0}</span>
                  <FaHeart className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-10 w-full">
        <Link to="/jeux">
          <Button label="Retour" type="button" />
        </Link>
      </div>
    </div>
  );
};

export default GameDetails;
