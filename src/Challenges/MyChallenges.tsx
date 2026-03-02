type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
};
type Game = {
  id: number;
  title: string;
  cover: string;
};
type Challenge = {
  id: number;
  name: string;
  game: Game;
};
type Participation = {
  id: number;
  title: string;
  url: string;
  user_id: number;
  challenge_id: number;
  voteCount: number;
  player: User;
  challenge: Challenge;
};

import { useState, useEffect } from "react";

export default function MyChallenges() {
  const userId = 2; // il faudra qu'on gère l'authentification

  const [myParticipations, setMyParticipations] = useState<Participation[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}/participations`)
      .then((res) => res.json())
      .then((data) => {
        setMyParticipations(data);
        console.log("Données reçues du back :", data);
        console.log("COMPONENT RENDU : MyChallenges");
        console.log(
          "API APPELÉE :",
          `http://localhost:3000/users/${userId}/participations`,
        );
      });
  }, [userId]);

  return (
    <section className="px-10 py-10">
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        Mes Challenges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {myParticipations.map((p) => (
          <article
            key={p.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => window.open(p.url, "_blank")}>
            <img
              src={p.challenge.game.cover}
              alt={p.challenge.game.title}
              className="w-68 h-60 rounded-lg border-4 border-green-light object-cover transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              {p.challenge.name}
            </p>
            <p className="text-green-light text-sm mt-1">{p.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
