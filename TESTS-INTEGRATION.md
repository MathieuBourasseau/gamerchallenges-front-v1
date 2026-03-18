# Mise en place des tests d’intégration – GamerChallenges Front

Ce document retrace toutes les étapes de mise en place des tests d’intégration.

[Lien vers une vidéo qui m'a bien aidé](https://www.youtube.com/watch?v=kqBTL_YWbuE)

## 1. Création de la branche dédiée

- [x] Création de la branche `test/integration` dans le front

---

## 2. Installation des dépendances de test

Packages installés :

- vitest
- jsdom
- @testing-library/react
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/user-event
- @types/testing-library\_\_jest-dom

<details>
  <summary>Si vous voulez voir les commandes d'installatioin des dépendances </summary>

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event @types/testing-library__jest-dom
```

</details>

## 3. Fichier setupTests.ts

Création de ce fichier dans /src, il ne contient qu'une seule ligne :

```ts
import "@testing-library/jest-dom";
```

Concrètement, il sert à créer un environnement de test via un dom virtuel, ce qui permet de faire des tests d’intégration sur des composants React.
il est chargé automatiquement avant chaque test

## 4. Configuration de Vitest

Modification du fichier `vite.config.ts` pour y ajouter la configuration de Vitest :

```ts
import { defineConfig } from "vitest/config";
// cette ligne a changé car il fallait importer defineConfig depuis vitest/config et pas vite
```

<details>
    <summary>Voici la configuration complète du fichier vite.config.ts </summary>
    
    ```ts
    import { defineConfig } from "vitest/config";
    import react from "@vitejs/plugin-react";
    import tailwindcss from "@tailwindcss/vite";

    export default defineConfig({
      plugins: [react(), tailwindcss()],
      test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        globals: true,
        env: {
          VITE_API_URL: "http://localhost:3000",
        },
      },
    });
    ```

    **🔴 Point critique** : L'ajout de `env.VITE_API_URL` dans la config de test est **ESSENTIEL** ! Sans cette variable d'environnement, les tests vont crasher car `import.meta.env.VITE_API_URL` serait `undefined`.

</details>
Cette configuration permet d'indiquer à Vitest d'utiliser jsdom comme environnement de test, de charger le fichier setupTests.ts avant chaque test et d'utiliser des variables globales pour les fonctions de test.

## 5. Commandes de tests à inclure dans le package.json

```json
"test": "vitest",
"test:ui": "vitest --ui"
```

Cela permet dans lancer les commandes `npm run test` pour lancer les tests en ligne de commande et `npm run test:ui` pour lancer l'interface graphique de Vitest.

## 6. Création d'un test simple pour checker si tout est bien configuré

### Création du ficher `src/example.test.tsx` .

- `describe` permet de regrouper les tests liés à un même sujet
- `it` permet de définir un test individuel.
- `expect` permet de faire des assertions sur les résultats obtenus.

[voir le fichier en question](example.test.ts)

- ` expect(1 + 1).toBe(2)` : vérifie que l'addition de 1 et 1 donne bien 2

<details>
    <summary>
        résultat dans la console :
    </summary>
        
        
    ```bash
    > gamerchallenges-front@0.0.0 test
    > vitest
    
    
     DEV  v4.1.0 /home/vince/Projets-perso/gamerchallenges-front
    
     ✓ example.test.ts (1 test) 3ms
       ✓ Example test (1)
         ✓ works 1ms
    
     Test Files  1 passed (1)
          Tests  1 passed (1)
       Start at  14:41:24
       Duration  972ms (transform 42ms, setup 91ms, import 15ms, tests 3ms, environment 694ms)
    
     PASS  Waiting for file changes...
           press h to show help, press q to quit
    
    
    ```
</details>

# 7. Installation de MSW pour les tests d’intégration

- la commande d'installation est la suivante :

```bash
npm install -D msw
```

- Nous créons un dossier `src/mocks` pour y mettre tous les fichiers liés à MSW

- Ensuite nous allons créer deux fichiers : [`src/mocks/handlers.ts`](src/mocks/handlers.ts) et [`src/mocks/server.ts`](src/mocks/server.ts) pour configurer MSW

tout simplement pour simuler les réponses de l'API lors des tests pour éviter de faire des appels réels...
→ → tests plus rapides et plus fiables ← ←

# 8. Branchons MSW à Vitest 😅 (termes techniques)

- Nous reprenons le fichier `src/setupTests.ts` pour y ajouter la configuration de MSW

Nous y ajoutons l'import du server depuis le fichier `server.ts` et les hooks comme :

`beforeAll`, `afterEach` et `afterAll` pour démarrer le serveur avant tous les tests, réinitialiser les handlers après chaque test et fermer le serveur après tous les tests.

<details>
    <summary> En savoir plus sur le rôle de ces hooks </summary>

- beforeAll → démarre MSW avant tous les tests

- afterEach → réinitialise les handlers entre chaque test (important pour éviter les fuites d’état)

- afterAll → coupe MSW quand les tests sont terminés

</details>

#### Voyons si MSW est bien branché en créant un petit test

- Création d'un fichier [src/mocks/handlers.ts](src/mocks/handlers.ts) pour y définir un handler qui simule une réponse d'API pour une route de login

<details>
    <summary> En savoir plus sur le rôle de ces hooks </summary>

```bash
> gamerchallenges-front@0.0.0 test
> vitest

DEV v4.1.0 /home/vince/Projets-perso/gamerchallenges-front

✓ example.test.ts (1 test) 5ms
✓ src/msw.test.ts (1 test) 27ms

Test Files 2 passed (2)
Tests 2 passed (2)
Start at 15:08:51
Duration 1.17s (transform 106ms, setup 393ms, import 38ms, tests 32ms, environment 1.47s)

PASS Waiting for file changes...
press h to show help, press q to quit


```

</details>

---

# 🚨 ALERTE 🚨

**!!! Maintenant que tout est configuré , bien en place etc... on passe aux vrais tests !!!**

Pour le premier test nous choisissons de tester le composant `ChangePasswordModal`

Il est assez simple dans sa conception puisqu'il y a trois champs de saisie et un bouton de validation.

### 9. Création du fichier de test pour ChangePasswordModal

Création du fichier `src/Pages/My-Account/ChangePasswordModal.test.tsx` à côté du composant lui-même

---

## 🔴 Problèmes rencontrés et solutions

### **Le blocage initial : Timeout après 5 secondes**

```
× envoie la requête et ferme le modal en cas de succès
Error: Test timed out in 5000ms.
```

**Qu'est-ce qui se passait réellement ?**

```
┌──────────────────────────────────────────────────────────┐
│ TEST DÉMARRE                                             │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Taper les mots de passe                                  │
│ Cliquer "Valider"                                        │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ Le composant lance: fetch(VITE_API_URL + "/...")         │
│                                                          │
│ 🔴 PROBLÈME:                                             │
│ VITE_API_URL = undefined (pas défini dans les tests)   │
│ URL réelle = undefined/me/change-password                │
│ ↓                                                         │
│ MSW attend: "http://localhost:3000/me/change-password"   │
│ MSW reçoit: "undefined/me/change-password"               │
│ ↓                                                         │
│ MSW dit: "J'ai pas le handler pour ça !"                │
│ La requête s'échappe vers le vrai serveur                │
└────────────────┬─────────────────────────────────────────┘
                 │
         ⏳ Attendre... (5 secondes)
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│ TIMEOUT!                                                 │
│ Le test est arrêté 💥                                   │
└──────────────────────────────────────────────────────────┘
```

**Ce qui rendait ça frustrant :**

❌ Pas de message d'erreur clair ("La variable d'environnement manque !")  
❌ Le test ne s'arrêtait pas vite (5 secondes c'est long)  
❌ Plusieurs problèmes à la fois rendaient le debugging difficile  
❌ La Promise (fetch) n'aboutissait jamais

---

## ✅ Les 3 solutions pour débloquer

### **Solution 1️⃣ : Définir VITE_API_URL dans vite.config.ts**

<details>
    <summary> Voir les détails </summary>

**Avant** :

```typescript
test: {
  environment: "jsdom",
  setupFiles: "./src/setupTests.ts",
  globals: true,
}
```

**Après** :

```typescript
test: {
  environment: "jsdom",
  setupFiles: "./src/setupTests.ts",
  globals: true,
  env: {
    VITE_API_URL: "http://localhost:3000",  // ← Ajouté !
  },
}
```

**Effet** :

```
Avant: import.meta.env.VITE_API_URL = undefined
Après: import.meta.env.VITE_API_URL = "http://localhost:3000"
```

✅ Maintenant l'URL est correctement définie dans les tests !

</details>

---

### **Solution 2️⃣ : Utiliser un pattern wildcard dans MSW**

<details>
    <summary> Voir les détails </summary>

**Avant** :

```typescript
http.patch("http://localhost:3000/me/change-password", async () => {
  return HttpResponse.json({ ok: true }, { status: 200 });
});
```

**Après** :

```typescript
http.patch("*/me/change-password", async () => {
  return HttpResponse.json({ ok: true }, { status: 200 });
});
```

**Explication du pattern `*/me/change-password`** :

- `*` = "n'importe quoi" (http://, https://, localhost, n'importe quel domaine)
- `/me/change-password` = la partie qui doit correspondre exactement

**Exemples qui matchent** :

```
http://localhost:3000/me/change-password  ✅
https://api.example.com/me/change-password  ✅
http://foo.bar.com/me/change-password  ✅
```

**Avantage** : Fonctionne peu importe quelle URL base on utilise

</details>

---

### **Solution 3️⃣ : Enlever les fake timers problématiques**

<details>
    <summary> Voir les détails </summary>

**Avant** (❌ ne marche pas) :

```typescript
it("envoie la requête...", async () => {
  vi.useFakeTimers(); // ← Problématique avec fetch

  const user = userEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
  });

  // ... code ...

  vi.runAllTimers();
  expect(onClose).toHaveBeenCalled();
});
```

**Après** (✅ fonctionne) :

```typescript
it("envoie la requête...", async () => {
  const user = userEvent.setup(); // ← Sans fake timers !

  // ... code ...

  // Attendre que onClose soit appelé (naturellement)
  await waitFor(
    () => {
      expect(onClose).toHaveBeenCalled();
    },
    { timeout: 3000 },
  );
});
```

**Pourquoi c'est mieux** :

- Pas de conflit avec les Promises
- `waitFor` attend naturellement sans forcer le temps
- Plus simple et fiable

</details>

---

## 10. Le test complet de ChangePasswordModal

### **Structure du test**

<details>
    <summary> Helper pour rendre le composant avec AuthContext </summary>

```typescript
function renderWithAuth(
  ui: React.ReactElement,
  { token = "fake-token", onClose = vi.fn() } = {},
) {
  return {
    onClose,
    ...render(
      <AuthContext.Provider value={{ token }}>{ui}</AuthContext.Provider>,
    ),
  };
}
```

Ce helper permet de rendre le composant avec le contexte AuthContext déjà fourni.

</details>

### **Test 1️⃣ : Affichage du modal**

```typescript
it("affiche correctement le modal", () => {
  renderWithAuth(<ChangePasswordModal onClose={vi.fn()} />);

  expect(screen.getByText("Modifier mon mot de passe")).toBeInTheDocument();

  expect(screen.getByPlaceholderText("Ancien mot de passe")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Nouveau mot de passe")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirmer le mot de passe")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Annuler" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Valider" })).toBeInTheDocument();
});
```

**Ce qu'on teste** : Que tous les éléments du modal s'affichent correctement

---

### **Test 2️⃣ : Validation des mots de passe**

```typescript
it("affiche une erreur si les mots de passe ne correspondent pas", async () => {
  const user = userEvent.setup();

  renderWithAuth(<ChangePasswordModal onClose={vi.fn()} />);

  await user.type(screen.getByPlaceholderText("Ancien mot de passe"), "oldpass");
  await user.type(screen.getByPlaceholderText("Nouveau mot de passe"), "newpass1");
  await user.type(screen.getByPlaceholderText("Confirmer le mot de passe"), "newpass2");

  await user.click(screen.getByRole("button", { name: "Valider" }));

  expect(screen.getByText("Les mots de passe ne correspondent pas.")).toBeInTheDocument();
});
```

**Ce qu'on teste** : Que la validation client-side marche (quand les 2 nouveaux mots de passe diffèrent)

---

### **Test 3️⃣ : Soumission réussie**

```typescript
it("envoie la requête et ferme le modal en cas de succès", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  renderWithAuth(<ChangePasswordModal onClose={onClose} />);

  // Remplir les champs
  await user.type(screen.getByPlaceholderText("Ancien mot de passe"), "oldpass");
  await user.type(screen.getByPlaceholderText("Nouveau mot de passe"), "newpass");
  await user.type(screen.getByPlaceholderText("Confirmer le mot de passe"), "newpass");

  // Cliquer le bouton
  await user.click(screen.getByRole("button", { name: "Valider" }));

  // Attendre que le message de succès s'affiche
  await waitFor(() => {
    expect(screen.getByText("Mot de passe modifié !")).toBeInTheDocument();
  });

  // Attendre que onClose soit appelé (après 1500ms)
  await waitFor(
    () => {
      expect(onClose).toHaveBeenCalled();
    },
    { timeout: 3000 },
  );
});
```

**Ce qu'on teste** :

1. Que la requête est envoyée
2. Que le message de succès s'affiche
3. Que la modal se ferme (onClose est appelée)

---

## 🔄 Le flux complet d'un test

```
┌────────────────────────────────────┐
│ TEST DÉMARRE                       │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ Rendre le composant                │
│ (avec AuthContext et onClose spy) │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ Taper dans tous les champs         │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ Cliquer le bouton "Valider"        │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ Fetch → /me/change-password        │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ MSW intercepte (pattern: */...)    │
│ et répond: { ok: true } + 200      │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ setSuccess("Mot de passe...")      │
│ setTimeout(() => onClose(), 1500)  │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ waitFor detecte le message         │
│ ✅ Test valide le succès          │
└─────────────┬──────────────────────┘
              │
         ⏳ 1.5 secondes
              │
              ▼
┌────────────────────────────────────┐
│ onClose() s'exécute                │
└─────────────┬──────────────────────┘
              │
              ▼
┌────────────────────────────────────┐
│ waitFor detecte onClose appelée    │
│ ✅ Test réussit !                 │
└────────────────────────────────────┘
```

---

## ✅ Résultat final

```
 ✓ src/Pages/My-Account/ChangePasswordModal.test.tsx (3 tests) 2104ms
     ✓ affiche correctement le modal 243ms
     ✓ affiche une erreur si les mots de passe ne correspondent pas 200ms
     ✓ envoie la requête et ferme le modal en cas de succès 1674ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
```

**Tous les tests réussissent !**

---

## 💡 Leçons importantes à retenir

### **1. Les variables d'environnement dans les tests**

Les variables `.env` ne sont **PAS** automatiquement disponibles dans les tests. Il faut les définir dans `vite.config.ts` → section `test.env`

### **2. Les patterns dans MSW**

- `exactly-this-url` : correspondance exacte
- `*/path/to/endpoint` : n'importe quelle URL base, chemin exact, ça aide énormément pour les tests

### **3. Les fake timers avec les Promises**

Fake timers + fetch/Promise = 💥 Problème. Mieux vaut utiliser `waitFor` et laisser les timeouts s'exécuter naturellement.

### **4. Attendre les choses dans les tests**

```typescript
// ❌ Mauvais : supposer que c'est fait
expect(onClose).toHaveBeenCalled();

// ✅ Bon : attendre que ça se passe
await waitFor(() => {
  expect(onClose).toHaveBeenCalled();
});
```

En résumé, pas de méthode pour forcer les timers (timeout, interval etc...) à avancer, mais plutôt une méthode pour attendre que les choses se passent

## A noter que, pour une expérience un peu plus sympa, on peut lancer `npm run test:ui` pour voir les tests d'une autre manière. Avec des graphiques, des logs plus clairs etc... c'était la partie agréable....
