export default function Home() {
  return (
    <>
      <section className="flex justify-between px-5 bg-blue-dark">
        <p className="uppercase font-bold text-white">
          Vous êtes prêts? À Vous de jouer !
        </p>
        <img src="" alt="une image de l'accueil" />
      </section>
      <section className="top-challenge ">
        <h2>Les vidéos les plus likées</h2>
        <article>
          <img src="" alt="" />
          <p>Posséder toutes les armes du jeu</p>
        </article>
        <article>
          <img src="" alt="" />
          <p>Avoir 20 amis</p>
        </article>
        <article>
          <img src="" alt="" />
          <p>Rester sur un cheval pendant trois heures</p>
        </article>
        <button>Voir plus</button>
      </section>
    </>
  );
}
