import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import H1Title from "../../ui/H1Title";
import TitleImage from "../../assets/images/Title.png";
import backgroundImage from "../../assets/images/draw_team.png";
import Button from "../../ui/Button";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";
import Image from "../../ui/Image";
import H2 from "../../ui/H2";

type TopChallenge = {
  id: number;
  name: string;
  participationCount?: number;
  game?: {
    id: number;
    title: string;
    cover: string;
  };
};

export default function Home() {
  const [bestChallenges, setBestChallenges] = useState<TopChallenge[]>([]);
  const [error, setError] = useState<Partial<ApiErrorResponse>>({});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setError({});

    fetch(`${API_URL}/challenges/top`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw data;
          });
        }
        return res.json();
      })
      .then((data) => {
        setBestChallenges(data);
      })
      .catch((err: any) => {
        console.error("Error fetching top challenges:", err);

        setError({
          statusCode: err.status || 500,
          server: err.error || err.message || "Impossible de charger les meilleurs challenges.",
        });
      });
  }, [API_URL]);

  return (
    <>
      <div
        className="
          flex flex-col items-center justify-center gap-4 mx-auto w-full max-w-7xl
          lg:grid lg:grid-cols-2 lg:items-center lg:gap-8"
      >
        {/* LEFT PART OF HERO */}
        <div className="flex flex-col items-center text-center px-6">
          <img
            src={TitleImage}
            alt="Title"
            className="w-80 md:w-72 lg:w-full lg:max-w-md h-auto"
          />
          <div className="hidden lg:block">
            <H1Title>Bienvenue sur Gamer Challenge !</H1Title>
            <p className="text-p-mobile md:text-p-tablet text-white">
              La plateforme où tu peux relever de nombreux challenges sur tes jeux
              vidéos préférés et les partager avec la communauté !
            </p>
          </div>
        </div>

        {/* RIGHT PART OF HERO */}
        <div className="hidden lg:flex justify-center items-center w-full">
          <img
            src={backgroundImage}
            alt="Draw Team"
            className="
        hidden md:block
        w-40 sm:w-56 md:w-72 lg:w-full lg:max-w-xl h-auto
      "
          />
        </div>

        {/* PART ONLY DISPLAYED ON MOBILE */}
        <div
          className="
            flex flex-col items-center text-center px-6 gap-2
            lg:hidden"
        >
          <H1Title>Bienvenue sur Gamer Challenge !</H1Title>
          <p className="max-w-2xl text-p-mobile md:text-p-tablet text-white">
            La plateforme où tu peux relever de nombreux challenges sur tes jeux
            vidéos préférés et les partager avec la communauté !
          </p>
        </div>
      </div>

      <section className="text-center px-6 py-12">
        <H2>Top 3 challenges</H2>

        <div className="max-w-6xl mx-auto mb-6">
          <ErrorSummary errors={error} />
        </div>

        {error.server && bestChallenges.length === 0 ? (
          <p className="text-center text-white mt-10 opacity-50">
            Aucun challenge à afficher pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-items-center max-w-6xl mx-auto">
            {bestChallenges.map((challenge) => (
              <article
                key={challenge.id}
                className="
                  flex flex-col items-center justify-start
                  bg-green-light/20
                  rounded-lg p-3
                  w-48 sm:w-56 lg:w-64
                  transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl
                "
              >
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={challenge.game?.cover}
                    alt={challenge.game?.title || challenge.name}
                  />
                </Link>

                <p className="text-white font-medium text-center mt-3">
                  {challenge.name}
                </p>

                <p className="text-white/70 text-sm mt-1 text-center">
                  {challenge.game?.title}
                </p>

                <p className="text-white/70 text-xs mt-1 text-center">
                  {Number(challenge.participationCount || 0)} participations
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            to={`/challenges`}
            className={`text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                            hover:bg-white hover:text-green-light hover:border-green-light md:text-base`}
          >
            Voir plus
          </Link>
        </div>
      </section>
    </>
  );
}