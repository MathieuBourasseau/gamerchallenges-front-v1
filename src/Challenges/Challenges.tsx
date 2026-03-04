type Challenge = {
  id: number;
  name: string;
  description: string;
  game: {
    id: number;
    title: string;
    cover: string;
  };
}; // on reprend les types qui ont été définis dans la méthode getAllCHallenges du back et on applique la couche de sécurité comme Mathieu nous a appris ! → Typescript

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../ui/Pagination"; // ← composant pagination Ludi top !

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]); // ← state qui contient TOUS les challenges
  const [currentPage, setCurrentPage] = useState(1); // ← page actuelle (pagination front)
  const pageSize = 8; // ← nombre de challenges par page

  const navigate = useNavigate(); // ← hook pour naviguer vers une autre page (ex: détail d'un challenge)

  // fonction pour gérer le clic sur un challenge
  const handleChallengeClick = (challengeId: number) => {
    navigate(`/challenges/${challengeId}`); // ← redirection vers la page de détail du challenge
  };

  const API_URL = import.meta.env.VITE_API_URL; // on peut aussi définir l'url de l'api dans une variable pour éviter les erreurs de frappe et faciliter la maintenance du code

  useEffect(() => {
    fetch(`${API_URL}/challenges`) // ← req pour récupérer tous les challenges
      .then((res) => res.json()) // on instancie la réponse format json
      .then((data) => setChallenges(data)) // on met à jour le state (les changements ne se font qu'avec "set...")
      .catch((err) => console.error("Erreur fetch challenges :", err)); // ← petite gestion d'erreur si le fetch ne fonctionne pas....
  }, []); // ← tableau vide = useEffect ne charge qu'une fois les données au montage du composant

  const totalPages = Math.ceil(challenges.length / pageSize); // ← calcul du nombre total de pages
  const startIndex = (currentPage - 1) * pageSize; // ← index de départ pour slice()
  const currentChallenges = challenges.slice(startIndex, startIndex + pageSize);
  // ← slice() permet d'afficher uniquement les challenges de la page actuelle

  return (
    <section className="px-10 py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        Tous les challenges
      </h2>

      {/* Grille responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {currentChallenges.map((challenge) => (
          <article key={challenge.id} className="flex flex-col items-center">
            <img
              src={challenge.game.cover}
              alt={challenge.game.title}
              onClick={() => handleChallengeClick(challenge.id)} // ← CORRECTION : on passe une fonction, pas le résultat
              className="w-68 h-60 rounded-lg border-4 border-green-light object-cover cursor-pointer
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              {challenge.name}
            </p>
          </article>
        ))}
      </div>

      <Pagination
        currentPage={currentPage} // ← page actuelle
        totalPages={totalPages} // ← nombre total de pages
        onPageChange={setCurrentPage} // ← callback pour changer de page
      />
    </section>
  );
}
