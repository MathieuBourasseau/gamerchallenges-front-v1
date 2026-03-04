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
import { Link } from "react-router-dom";
import { SiTwitch, SiYoutube, SiDiscord } from "react-icons/si";
import H1Title from "../ui/H1Title";
import Button from "../ui/Button";
import Pagination from "../ui/Pagination";
import AvatarProfile from "../assets/images/dofuscover.jpg"; // image locale temporaire pour l'avatar (en attendant Multer)

export default function MyChallenges() {
  const userId = 1; // il faudra qu'on gère l'authentification
  const API_URL = import.meta.env.VITE_API_URL;

  const [myParticipations, setMyParticipations] = useState<Participation[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // ← page actuelle (pagination front)
  const pageSize = 9; // ← nombre de challenges par page

  useEffect(() => {
    // Récupérer les données utilisateur
    fetch(`${API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        console.log("Utilisateur récupéré :", data);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération de l'utilisateur :", err),
      );

    // Récupérer les participations de l'utilisateur
    fetch(`${API_URL}/users/${userId}/participations`)
      .then((res) => res.json())
      .then((data) => {
        setMyParticipations(data);
        console.log("Données reçues du back :", data);
        console.log("Utilisateur récupéré :", data);
      });
  }, [userId]);

  const totalPages = Math.ceil(myParticipations.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentParticipations = myParticipations.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <section className="px-10 py-10 md:mx-10 lg:mx-10 ">
      <div className="flex flex-col items-center bg-linear-to-b from-green-medium to-green-darker p-8 rounded-lg border-4 border-green-light w-full mb-10">
        <h2 className="text-white text-2xl font-bold mb-2">
          {currentUser?.username || "Utilisateur"}
        </h2>
        <div className="flex items-center gap-10 mb-6 lg:gap-20">
          <div className="flex flex-col items-center justify-center w-40 h-20 md:w-50 md:h-35 lg:w-80 lg:h-50 rounded-4xl bg-black-dark/80 border-4 border-amber-300 text-amber-300 font-bold shadow-lg">
            <span className="text-lg">20</span>
            <span className="text-xs">ME SUIVENT</span>
          </div>

          <img
            src={AvatarProfile}
            alt={currentUser?.username || "avatar par défaut"}
            className="w-40 h-40 md:w-50 md:h-50 lg:w-80 lg:h-80 rounded-full border-4 border-green-light object-cover"
          />

          <div className="flex flex-col items-center justify-center w-40 h-20 md:w-50 md:h-35 lg:w-80 lg:h-50 rounded-4xl bg-black-dark/80 border-4 border-amber-300 text-amber-300 font-bold shadow-lg">
            <span className="text-lg">45</span>
            <span className="text-xs">JE FOLLOW</span>
          </div>
        </div>
        <div className="flex justify-center gap-8 mb-12">
          <a
            href="#twitch"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiTwitch size={40} />
          </a>
          <a
            href="#youtube"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiYoutube size={40} />
          </a>
          <a
            href="#discord"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiDiscord size={40} />
          </a>
        </div>

        <H1Title>Mes Challenges</H1Title>

        <div className="grid grid-cols-3 gap-6 justify-items-center mt-10">
          {currentParticipations.map((p) => (
            <article
              key={p.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => window.open(p.url, "_blank")}>
              <img
                src={p.challenge.game.cover}
                alt={p.challenge.game.title}
                className="
              w-40 h-40
              md:w-65 md:h-65
              lg:w-80 lg:h-80 
              rounded-lg border-4 border-green-light object-cover
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl
            "
              />
              <p className="text-white font-medium text-center mt-3">
                {p.challenge.name}
              </p>
              <p className="text-green-light text-sm mt-1">{p.title}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <div className="flex justify-center mt-10 w-full">
        <Link to="/">
          <Button label="Retour à l'accueil" type="button" />
        </Link>
      </div>
    </section>
  );
}
