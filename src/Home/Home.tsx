import titleImage from "../assets/images/Title.png";
import temporaryImage from "../assets/images/cyberpunkcover.jpeg";
import imageGame1 from "../assets/images/dofuscover.jpg";
import imageGame2 from "../assets/images/animalcrossingcover.jpg";
import imageGame3 from "../assets/images/reddeadcover.jpg";

export default function Home() {
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
          <article className="flex flex-col items-center">
            <img
              src={imageGame1}
              alt=""
              className="w-60 h-60 rounded-lg mb-4 border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center">
              Posséder toutes les armes du jeu
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame2}
              alt=""
              className="w-60 h-60 rounded-lg mb-4 border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center">Avoir 20 amis</p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame3}
              alt=""
              className="w-60 h-60 rounded-lg mb-4 border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center">
              Rester sur un cheval pendant trois heures
            </p>
          </article>
        </div>

        <button
          type="button"
          className="text-white font-bold bg-green-dark hover:bg-green-light px-8 py-3 rounded-full mt-10 transition active:bg-blue-medium">
          Voir plus
        </button>
      </section>
    </>
  );
}
