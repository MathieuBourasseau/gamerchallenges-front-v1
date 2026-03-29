import { useNavigate } from "react-router-dom";
import H1Title from "../../ui/H1Title";

function Legal() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto p-6 text-white">
      {/* Header avec Titre */}
      <header className="text-center">
        <H1Title>MENTIONS LÉGALES</H1Title>
      </header>

      {/* SECTION : About the company */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex flex-col gap-2">
          <h2 className="text-green-light font-bold uppercase tracking-wider text-sm">Éditeur</h2>
          <div className="text-p-mobile md:text-p-tablet lg:text-base opacity-90">
            <p className="font-semibold text-lg">GamerChallenges</p>
            <p>Rue du challenge, Jeuville, France</p>
            <p>SIRET : 123 456 789</p>
            <p>Représentant : Team GamerChallenges Cambridge</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
          <h2 className="text-green-light font-bold uppercase tracking-wider text-sm">Contact & Support</h2>
          <div className="text-p-mobile md:text-p-tablet lg:text-base opacity-90">
            <p>Email : <span className="text-green-light">contact@gamerchallenges.fr</span></p>
            <p>Hébergeur : Tél. 1007</p>
          </div>
        </div>
      </section>

      {/* SECTION :  DATA POLICY */}

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold border-l-4 border-green-light pl-4 py-1">
          Politique de Confidentialité
        </h2>

        <div className="flex flex-col gap-4 text-p-mobile md:text-p-tablet lg:text-base text-justify leading-relaxed">
          <div className="bg-white/5 p-4 rounded-lg">
            <p><strong>1.</strong> Les données personnelles collectées sur ce site sont traitées par : <strong>GamerChallenges</strong>.</p>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border-l-2 border-green-light/30">
            <p><strong>2.</strong> Nous collectons uniquement les données nécessaires au bon fonctionnement du service : nom d’utilisateur, adresse e-mail, avatar, mot de passe (chiffré).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "3. Création et gestion du compte utilisateur.",
              "4. Participation aux challenges et classement.",
              "5. Envoi de communications (emails, notifications).",
              "6. Amélioration de l’expérience utilisateur."
            ].map((text, index) => (
              <div key={index} className="p-3 border border-white/5 rounded-md italic text-sm opacity-80">
                {text}
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <p><strong>7.</strong> Le traitement repose sur le contrat, le consentement et l’intérêt légitime (sécurité, statistiques).</p>
            <p><strong>8.</strong> Les données sont conservées pendant la durée d’utilisation du compte, puis supprimées 3 ans après la dernière activité.</p>
            <p><strong>9.</strong> Les données ne sont jamais revendues. Elles peuvent être transmises uniquement à l’hébergeur et aux prestataires nécessaires au service.</p>
            <p><strong>10.</strong> Conformément au RGPD, vous disposez des droits d’accès, de rectification, de suppression, de limitation, d’opposition et de portabilité.</p>
            <p><strong>11.</strong> Contact : <strong className="text-green-light underline cursor-pointer">dpo@gamerchallenges.fr</strong>.</p>
            <p><strong>12.</strong> Les données sont protégées par chiffrement, HTTPS et mots de passe hashés.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="group relative px-12 py-4 uppercase font-black text-sm tracking-widest bg-green-light text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
        
          <span className="relative z-10 transition-colors duration-300 group-hover:text-green-medium">
            Retour à l'accueil
          </span>

          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </footer>
    </div>
  );
}

export default Legal;