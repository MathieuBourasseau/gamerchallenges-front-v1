import { Link } from "react-router-dom";
import H1Title from "../../ui/H1Title";

function Legal() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-6 text-center">
      <div className="flex flex-col gap-2 md:max-w-2xl md:mx-auto">
        <H1Title>MENTIONS LÉGALES</H1Title>

        <div
          className="
            flex flex-col gap-8 text-p-mobile text-justify text-white
            md:text-p-tablet
            lg:text-lg"
        >
          {/* Section : contact and company info */}
          <div>
            <p className="font-bold text-green-light mb-2">ÉDITEUR & CONTACT</p>
            <p>
              GamerChallenges — Rue du challenge, Jeuville, France. SIRET : 123
              456 789. Représentant légal : Team GamerChallenges Cambridge.
              Email : contact@gamerchallenges.fr. Hébergeur : Tél. 1007.
            </p>
          </div>

          {/* Section data policy */}

          <div className="flex flex-col gap-4">
            <p className="font-bold text-green-light border-b border-white/10 pb-2">
              POLITIQUE DE CONFIDENTIALITÉ
            </p>
            <p>
              1. Les données personnelles collectées sur ce site sont traitées
              par : GamerChallenges.
            </p>
            <p>
              2. Nous collectons uniquement les données nécessaires au bon
              fonctionnement du service, telles que : nom d’utilisateur, adresse
              e-mail, avatar, mot de passe (chiffré).
            </p>
            <p>
              3. Finalités : Création et gestion du compte utilisateur,
              participation aux challenges et classement, envoi de
              communications, amélioration de l’expérience utilisateur.
            </p>
            <p>
              4. Le traitement repose sur le contrat, le consentement et
              l’intérêt légitime (sécurité, statistiques).
            </p>
            <p>
              5. Les données sont conservées pendant la durée d’utilisation du
              compte, puis supprimées 3 ans après la dernière activité. Elles ne
              sont jamais revendues.
            </p>
            <p>
              6. Conformément au RGPD, vous disposez des droits d’accès, de
              rectification, de suppression et de portabilité. Contact :
              dpo@gamerchallenges.fr.
            </p>
            <p>
              7. Les données sont protégées par chiffrement, HTTPS et mots de
              passe hashés.
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/`}
        className="text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium 
                   hover:bg-white hover:text-green-light hover:border-green-light md:text-base transition-colors duration-300"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Legal;