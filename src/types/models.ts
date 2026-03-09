// Basic type for a game
export type Game = {
  id: number;
  title: string;
  genre: string;
  release_year: string | Date;
  cover: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  // Optional challenges
  challenges?: Challenge[]; 
};

// Basic type for a challenge
export type Challenge = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  game_id: number;
  created_at: string;
  updatedAt: string;
  creator?: User;
  game?: Game;
  participations?: Participation[];
};

// Basic type for participations
export type Participation = {
  id: number;
  content?: string; 
  user_id: number;
  challenge_id: number;
  createdAt: string;
  
  // Relations
  player?: User;
  challenge?: Challenge;
  voters?: User[];
};

// User type
export type User = {
  id: number;
  pseudo: string;
  challenges?: Challenge[];
  participations?: Participation[];
  votedParticipations?: Participation[];
};