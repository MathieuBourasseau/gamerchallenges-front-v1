import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SiTwitch, SiYoutube, SiDiscord } from "react-icons/si";
import H1Title from "../../ui/H1Title";
import H2 from "../../ui/H2";
import Button from "../../ui/Button";
import Pagination from "../../ui/Pagination";
import type { Participation } from "../../types/models";
import { useAuth } from "../../hooks/useAuth";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

export default function MyChallenges() {
  // useAuth to get current user
  const { userInfo } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  // STATES INITIALIZATION
  const [myParticipations, setMyParticipations] = useState<Participation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [errors, setErrors] = useState<Partial<ApiErrorResponse>>({});

  useEffect(() => {
    // get participations of the current user by fetching
    if (!userInfo) return;

    // Empty error before new request
    setErrors({});

    fetch(`${API_URL}/users/${userInfo.id}/participations`)
      .then((res) => {
        // If there is an error we sent back error from back
        if (!res.ok) {
          return res.json().then((data) => {
            throw data;
          });
        }
        return res.json();
      })
      .then((data) => {
        setMyParticipations(data);
        console.log("Participations récupérées :", data);
      })
      .catch((err: any) => {
        console.error("Erreur récupération participations :", err);
        // Update errors
        setErrors({
          server: err.error || "Impossible de charger vos participations.",
          statusCode: err.status || 500,
        });
      });
  }, [userInfo, API_URL]);

  //  PAGINATION
  const totalPages = Math.ceil(myParticipations.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentParticipations = myParticipations.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <section className="px-4 py-6 md:mx-10 lg:mx-10">
      {/* Show errors */}
      <ErrorSummary errors={errors} />

      <div className="flex flex-col items-center bg-linear-to-b from-green-dark to-blue-dark p-8 rounded-lg border-4 border-green-light w-full mb-10 lg:w-4/5 mx-auto">
        {/* User info header */}
        <p className="text-white text-3xl font-bold mb-2">
          {userInfo?.username || "Utilisateur"}
        </p>

        <div className="flex flex-row items-center justify-center gap-6 mb-6 md:gap-12 lg:gap-30">
          <div className="flex flex-col items-center justify-center w-32 h-14 md:w-40 md:h-20 lg:w-48 lg:h-24 rounded-3xl bg-black-dark/80 border-3 border-green-light text-green-light font-bold shadow-lg">
            <span className="text-lg md:text-2xl lg:text-3xl">20</span>
            <span className="text-[0.65rem] md:text-sm lg:text-base">
              ME SUIVENT
            </span>
          </div>

          {/* Dynamic avatar via userInfo */}
          <img
            src={userInfo?.avatar || "/default-avatar.png"} // fallback si pas d'avatar
            alt={userInfo?.username || "avatar par défaut"}
            className="w-25 h-25 md:w-32 md:h-32 lg:w-60 lg:h-60 rounded-full object-cover"
          />

          <div className="flex flex-col items-center justify-center w-32 h-14 md:w-40 md:h-20 lg:w-48 lg:h-24 rounded-3xl bg-black-dark/80 border-3 border-green-light text-green-light font-bold shadow-lg">
            <span className="text-lg md:text-2xl lg:text-3xl">45</span>
            <span className="text-[0.65rem] md:text-sm lg:text-base">
              JE FOLLOW
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-12 lg:gap-10">
          <a
            href="#twitch"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiTwitch className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a
            href="#youtube"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiYoutube className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a
            href="#discord"
            className="text-green-light hover:text-white transition-colors duration-300">
            <SiDiscord className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
        </div>

        <H1Title>Mes Challenges</H1Title>

        {/* Show message if there are no participations yet */}
        {errors.server && myParticipations.length === 0 ? (
          <p className="text-center text-white opacity-50 mt-4">
            Aucune participation à afficher.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-10 justify-items-center mt-4">
            {currentParticipations.map((p) => (
              <article
                key={p.id}
                className="flex flex-col items-center justify-between cursor-pointer bg-black-dark/60 border-2 border-green-light rounded-lg p-1 w-25 h-40 md:w-50 md:h-75 lg:w-70 lg:h-80"
                onClick={() => window.open(p.url, "_blank")}>
                <img
                  src={p.challenge?.game?.cover}
                  alt={p.challenge?.game?.title}
                  className="w-25 h-20 md:w-40 md:h-40 lg:w-60 lg:h-40 lg:mt-2 rounded-md object-cover border-2 border-green-light transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
                />
                <p className="text-white text-center mt-1 leading-tight mb-2 text-[0.65rem] md:text-p-tablet lg:text-2xl">
                  {p.challenge?.name}
                </p>
                <p className="bg-green-light text-white text-center px-2 py-1 rounded-full text-[0.5rem] w-fit hover:bg-white hover:text-green-light hover:border-green-light hover:border-2 md:text-p-tablet md:mb-1 lg:text-2xl">
                  {p.title}
                </p>
              </article>
            ))}
          </div>
        )}

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
