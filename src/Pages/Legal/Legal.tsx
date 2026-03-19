import { useNavigate } from "react-router-dom";
import H1Title from "../../ui/H1Title";

function Legal() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <H1Title>MENTIONS LÉGALES</H1Title>

      <p className="text-lg text-white mb-4 text-justify">
        GamerChallenges Rue du challenge, Jeuville, France SIRET : 123 456 789
        Représentant légal : Team GamerChallenges Cambridge Email :
        contact@gamerchallenges.fr Hébergeur : Tél. 1007
      </p>

      <p className="text-lg text-white mb-4 text-justify">
        1. Les données personnelles collectées sur ce site sont traitées par :
        GamerChallenges.
        <br />
        <br />
        2. Nous collectons uniquement les données nécessaires au bon
        fonctionnement du service, telles que : nom d’utilisateur, adresse
        e-mail, avatar, mot de passe (chiffré).
        <br />
        <br />
        3. Création et gestion du compte utilisateur.
        <br />
        <br />
        4. Participation aux challenges et classement.
        <br />
        <br />
        5. Envoi de communications (emails, notifications).
        <br />
        <br />
        6. Amélioration de l’expérience utilisateur.
        <br />
        <br />
        7. Le traitement repose sur le contrat, le consentement et l’intérêt
        légitime (sécurité, statistiques).
        <br />
        <br />
        8. Les données sont conservées pendant la durée d’utilisation du compte,
        puis supprimées 3 ans après la dernière activité.
        <br />
        <br />
        9. Les données ne sont jamais revendues. Elles peuvent être transmises
        uniquement à l’hébergeur et aux prestataires nécessaires au service.
        <br />
        <br />
        10. Conformément au RGPD, vous disposez des droits d’accès, de
        rectification, de suppression, de limitation, d’opposition et de
        portabilité.
        <br />
        <br />
        11. Contact : dpo@gamerchallenges.fr.
        <br />
        <br />
        12. Les données sont protégées par chiffrement, HTTPS et mots de passe
        hashés.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 uppercase font-bold bg-green-light text-white rounded-4xl hover:bg-white hover:text-green-light border-2 border-green-light transition-colors">
        Retour accueil
      </button>
    </div>
  );
}

export default Legal;
