import type { User } from "./user";
import type { Challenge } from "./challenge";

export type Participation = {
  id: number;
  title: string;
  url: string;
  user_id: number;
  challenge_id: number;
  voteCount: number;
  player: User;
  challenge: Challenge;
};
