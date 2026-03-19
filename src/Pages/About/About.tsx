import { useNavigate } from "react-router-dom";
import H1Title from "../../ui/H1Title";
function About() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <H1Title>À PROPOS</H1Title>
      <p className="text-lg text-white mb-4 text-justify">
        Bienvenue sur Gamer Challenges, la plateforme ultime pour les passionnés
        de jeux vidéo ! Nous sommes dédiés à offrir une expérience unique où les
        joueurs peuvent relever des défis excitants, partager leurs exploits et
        se connecter avec une communauté dynamique.
      </p>
      <p className="text-lg text-white mb-4 text-justify">
        Chez Gamer Challenges, nous croyons que le jeu est plus qu'un simple
        passe-temps, c'est une aventure, une compétition et une source de
        plaisir. Notre mission est de créer un espace où les joueurs peuvent
        s'amuser, se dépasser et célébrer leurs réussites ensemble.
      </p>
      <p className="text-lg text-white mb-4 text-justify">
        Rejoignez-nous dès aujourd'hui et plongez dans un monde de défis
        palpitants, de classements compétitifs et de camaraderie entre gamers.
        Que vous soyez un joueur occasionnel ou un compétiteur chevronné, Gamer
        Challenges est l'endroit idéal pour vivre votre passion du jeu vidéo à
        son apogée !
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 uppercase font-bold bg-green-light text-whitefont-semibold rounded-4xl hover:bg-white hover:text-green-light border-2 border-green-light transition-colors">
        Retour accueil
      </button>
    </div>
  );
}

export default About;
