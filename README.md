# 🎮 Gamer Challenges - Frontend

Bienvenue sur le dépôt Front-end de **Gamer Challenges**, une application web moderne développée avec **React** et **TypeScript**. Cette plateforme permet aux passionnés de jeux vidéo de créer, relever et voter pour des défis communautaires.

---

## 🛠️ Stack Technique

* **Framework :** React.js (v18+)
* **Langage :** TypeScript (TSX) pour un typage statique et une robustesse accrue du code.
* **Stylisation :** Tailwind CSS avec une approche **Mobile-first** et un design responsive.
* **Gestion d'état :** Hooks React (`useState`, `useEffect`, `useContext`).
* **Communication :** Fetch API pour la consommation asynchrone d'une API REST interne.
* **Outil de Build :** Vite.js pour un environnement de développement rapide et performant.

---

## 🔒 Sécurité du Client

La dimension sécurité est au cœur de l'architecture du Front-end :
* **Auto-escaping React :** Utilisation du rendu natif de React qui protège contre les injections de scripts en échappant automatiquement les caractères spéciaux.
* **Gestion du JWT :** Stockage sécurisé du token d'authentification dans le `localStorage` pour la persistance de session et la signature des requêtes vers le Back-end.
* **Variables d'environnement :** Utilisation de fichiers `.env` (via `import.meta.env`) pour isoler les informations sensibles (URL de l'API) et ne jamais les stocker "en dur" dans le code source.
* **Typage Strict :** TypeScript garantit que les données reçues de l'API (Challenge, User, Participation, Games) correspondent exactement aux modèles attendus, limitant les failles de logique.

---

## 📦 Gestion des Dépendances

Le cycle de vie des bibliothèques est entièrement géré via **NPM** (Node Package Manager) :

* **Installation :** `npm install` (installe l'ensemble des dépendances listées dans le `package.json`).
* **Audit :** Exécution régulière de `npm audit` pour détecter et corriger les vulnérabilités dans les paquets tiers.
* **Scripts :** `npm run dev` : Lance le serveur de développement local
---

## 🚀 Procédure de Mise en Service (Déploiement)

Le déploiement de l'interface est étroitement lié à la disponibilité de l'API. Voici la procédure de mise en place de l'environnement :

1. **Préparation du Back-end :** S'assurer que l'API Express est opérationnelle et que la base de données PostgreSQL a été initialisée et remplie (**Seeding** réalisé sur le dépôt Back-end).
2. **Configuration du Client :** Créer un fichier `.env` à la racine et renseigner l'URL de l'API :  
   `VITE_API_URL=http://localhost:3000`
3. **Installation :** Exécuter `npm install` pour récupérer les dépendances.
4. **Lancement :** Exécuter `npm run dev` pour démarrer l'application.

*Note : Conformément à la séparation des responsabilités, tous les scripts liés à la gestion de la base de données (création, migration, seeding) sont centralisés sur le dépôt Back-end pour une sécurité et une intégrité optimales.*

**Le repo backend est disponible ici** 👉 https://github.com/MathieuBourasseau/gamerchallenges-back-v1

---

## 📂 Structure du Projet

L'arborescence du projet suit une organisation modulaire pour faciliter la maintenance et l'évolution du code :

* **`/src/assets`** : Ressources statiques (images).
* **`/src/components`** : Composants React réutilisables (Header, Footer, Menu Burger).
* **`/src/Context`** : Gestion de l'état global. Contient notamment `AuthContext` pour la persistance du JWT et de l'ID utilisateur via le `localStorage`.
* **`/src/hooks`** : Hooks personnalisés, dont `useAuth` qui synchronise automatiquement le profil complet de l'utilisateur (`/me`) avec l'API dès que le token est valide.
* **`/src/mocks`** : Configuration pour les tests et le mock d'API (MSW).
* **`/src/Pages`** : Composants principaux représentant les différentes vues de l'application.
* **`/src/Services`** : Fonctions asynchrones gérant les appels vers l'API REST.
* **`/src/types`** : Définitions des interfaces TypeScript (Contrats de données).
* **`/src/ui`** : Composants d'interface utilisateur de base ou bibliothèques de design réutilisables (Boutons, titres, pagination,)
* **`/src/utils`** : Fonctions utilitaires et helpers (validation des champs de formulaires).
* **`App.tsx` & `main.tsx`** : Point d'entrée de l'application et configuration du routage.
* **`setupTests.ts` & `*.test.ts`** : Fichiers dédiés à l'environnement de test et aux tests unitaires/intégration.

---

## ⚙️ Installation Locale

```bash
# 1. Cloner le projet
git clone [https://github.com/votre-compte/gamer-challenges-front.git](https://github.com/votre-compte/gamer-challenges-front.git)

# 2. Installer les dépendances
npm install

# 3. Lancer en mode développement
npm run dev