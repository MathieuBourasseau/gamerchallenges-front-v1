import type { Game } from "./game";

export type Challenge = {
  id: number;
  name: string;
  description?: string; // optionnel si pas toujours présent
  game: Game;
};
