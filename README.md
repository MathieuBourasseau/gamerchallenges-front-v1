## Gamer Challenges FRONTEND

## Présentation
Le frontend constitue l’interface utilisateur de l’application. Il permet d’afficher les données et
d’interagir avec l’API backend que vous trouverez ici : https://github.com/MathieuBourasseau/gamerchallenges-back

## Technologies utilisées
- React
- TypeScript
- Vite
- Tailwind CSS
  
## Installation
Se placer dans le dossier frontend puis installer les dépendances :
npm install

## Variables d’environnement
- Créer un fichier .env 
- VITE_API_URL=http://localhost:3000

## Lancement
- npm run dev
- Application disponible sur : http://localhost:5173

## Fonctionnement
- Le frontend communique avec le backend via fetch : 
fetch(`${import.meta.env.VITE_API_URL}/users`)

## Déploiement
- Frontend déployable
- Variable en production :
VITE_API_URL=https://backend-url.com
--> Remplacer l’URL locale par celle du backend déployé
