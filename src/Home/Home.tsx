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
import H1Title from "../ui/H1Title";
export default function Home() {
  const [bestParticipations, setBestParticipations] = useState<Participation[]>(
    [],
  );

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setBestParticipations(data));
  }, []);

  return (
    <>
      <section className="text-center px-6 py-12">
        <H1Title>Les vidéos les plus likées</H1Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center max-w-6xl mx-auto">
          {bestParticipations.map((p) => (
            <article key={p.id} className="flex flex-col items-center">
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={p.challenge.game.cover}
                  alt={p.challenge.game.title}
                  className="w-60 h-60 rounded-lg mb-4 border-4 border-green-light object-cover transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
                />
              </a>

              <p className="text-white font-medium text-center">
                {p.challenge.name}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="text-white font-bold bg-green-dark hover:bg-green-light px-8 py-3 rounded-full mt-10 transition active:bg-blue-medium"
          onClick={() => (window.location.href = "/challenges")}>
          {" "}
          {/* pour le moment c'est une redirection vers la page des challenges, à
          changer plus tard  */}
          Voir plus
        </button>
      </section>
    </>
  );
}
