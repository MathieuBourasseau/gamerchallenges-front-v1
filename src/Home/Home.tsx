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
import titleImage from "../assets/images/Title.png";
import temporaryImage from "../assets/images/dofuscover.jpg";
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
      <article className="flex justify-center items-center gap-60 px-6 py-10">
        <div className="flex flex-col items-center">
          <img src={titleImage} alt="titre" className="w-150" />
          <p className="uppercase font-bold text-white text-lg text-center mt-4">
            Vous êtes prêts ? À vous de jouer !
          </p>
        </div>

        <img
          src={temporaryImage}
          alt="image temporaire pour la page d'accueil"
          className="w-72 rounded-lg shadow-xl"
        />
      </article>

      <section className="text-center px-6 py-12">
        <h2 className="text-3xl font-bold mb-10 text-white">
          Les vidéos les plus likées
        </h2>

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

              <p className="text-green-light text-sm">{p.title}</p>
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
