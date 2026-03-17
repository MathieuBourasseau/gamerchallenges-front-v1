import type { Challenge } from "../../types/challenge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import H1Title from "../../ui/H1Title";
import Pagination from "../../ui/Pagination";
import ErrorSummary from "../../ui/ErrorSummary";

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [error, setError] = useState<any>({}); 
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: number) => {
    navigate(`/challenges/${challengeId}`);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/challenges`)
      .then((res) => {
        // Checking res and stop the code if there is an error
        if (!res.ok) {
          return res.json().then((data) => { throw data; });
        }
        return res.json();
      })
      .then((data) => setChallenges(data))
      .catch((err) => {
        console.error("Erreur fetch challenges :", err);
        setError({
          server: err.error || "Impossible de charger les challenges.",
          statusCode: err.status || 500
        });
      });
  }, [API_URL]);

  const totalPages = Math.ceil(challenges.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentChallenges = challenges.slice(startIndex, startIndex + pageSize);

  return (
    <section className="px-10 py-10">
    
      <ErrorSummary errors={error} />

      <H1Title>Tous les challenges</H1Title>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {/* On vérifie que challenges est bien un tableau avant de mapper */}
        {Array.isArray(currentChallenges) && currentChallenges.map((challenge) => (
          <article key={challenge.id} className="flex flex-col items-center">
            <img
              src={challenge.game.cover}
              alt={challenge.game.title}
              onClick={() => handleChallengeClick(challenge.id)}
              className="w-45 h-40 rounded-lg border-4 border-green-light object-cover cursor-pointer
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              {challenge.name}
            </p>
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}