import { ReactNode } from "react";

export interface PokemonDetails {
  name: ReactNode;
  hp?: number; // Aggiungi questa linea
  stats: Stat[];
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
}

export interface Pokemon {
  name: string;
  url: string;
  details?: PokemonDetails; // Aggiungi questa linea
}
export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}
