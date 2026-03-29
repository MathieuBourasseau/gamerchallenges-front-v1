import { Link } from "react-router-dom";
import H1Title from "../../ui/H1Title";
function About() {

  return (
    <div className="
      flex flex-col gap-8 max-w-4xl mx-auto p-6 text-center"
    >
      <div
        className="
          flex flex-col gap-2
          md:max-w-2xl md:mx-auto"
      >
        <H1Title>À PROPOS</H1Title>

        <div
          className="
            flex flex-col gap-8 text-p-mobile text-justify text-white
            md:text-p-tablet
            lg:text-lg"
        >
          <p>
            Bienvenue sur Gamer Challenges, la plateforme ultime pour les passionnés
            de jeux vidéo ! Nous sommes dédiés à offrir une expérience unique où les
            joueurs peuvent relever des défis excitants, partager leurs exploits et
            se connecter avec une communauté dynamique.
          </p>
          <p>
            Chez Gamer Challenges, nous croyons que le jeu est plus qu'un simple
            passe-temps, c'est une aventure, une compétition et une source de
            plaisir. Notre mission est de créer un espace où les joueurs peuvent
            s'amuser, se dépasser et célébrer leurs réussites ensemble.
          </p>
          <p>
            Rejoignez-nous dès aujourd'hui et plongez dans un monde de défis
            palpitants, de classements compétitifs et de camaraderie entre gamers.
            Que vous soyez un joueur occasionnel ou un compétiteur chevronné, Gamer
            Challenges est l'endroit idéal pour vivre votre passion du jeu vidéo à
            son apogée !
          </p>
        </div>

      </div>

      <Link
        to={`/`}
        className={`text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                            hover:bg-white hover:text-green-light hover:border-green-light md:text-base`}
      >
        Retour à l'accueil
      </Link>

    </div>
  );
}

export default About;
