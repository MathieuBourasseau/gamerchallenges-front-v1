type Challenge = {
  id: number;
  name: string;
  description: string;
  game: {
    id: number;
    title: string;
    cover: string;
  };
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import H1Title from "../ui/H1Title";
import Pagination from "../ui/Pagination";

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const navigate = useNavigate();

  const handleChallengeClick = (challengeId: number) => {
    navigate(`/challenges/${challengeId}`); //
  };

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/challenges`)
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Erreur fetch challenges :", err));
  }, []);

  const totalPages = Math.ceil(challenges.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentChallenges = challenges.slice(startIndex, startIndex + pageSize);

  return (
    <section className="px-10 py-10">
      <H1Title>Tous les challenges</H1Title>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {currentChallenges.map((challenge) => (
          <article key={challenge.id} className="flex flex-col items-center">
            <img
              src={challenge.game.cover}
              alt={challenge.game.title}
              onClick={() => handleChallengeClick(challenge.id)} // ← CORRECTION : on passe une fonction, pas le résultat
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
