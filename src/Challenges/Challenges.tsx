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

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/challenges") // ← ça c'est le req pour récupérer les challenges par la méthode fetch
      .then((res) => res.json()) // on instancie la réponse format json
      .then((data) => setChallenges(data)) // on met à jour avec state 'les changement ne se font qu'avec "set..." les challenges
      .catch((err) => console.error("Erreur fetch challenges :", err)); // ← petite gestion d'erreur si le fetch ne fonctionne pas....
  }, []); //← le tableau ici est vide ça veut dire que useEffect ne charge qu'une fois les données au montage du composant

  return (
    <section className="px-10 py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        Tous les challenges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {challenges.map((challenge) => (
          <article key={challenge.id} className="flex flex-col items-center">
            <img
              src={challenge.game.cover}
              alt={challenge.game.title}
              className="w-68 h-60 rounded-lg border-4 border-green-light object-cover
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              {challenge.name}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
