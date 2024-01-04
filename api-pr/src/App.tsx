import React, { useEffect, useState } from "react";

interface PokemonDetails {
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

interface Pokemon {
  name: string;
  url: string;
  details?: PokemonDetails; // Aggiungi questa linea
}

const Pokemon: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data: { results: Pokemon[] } = await response.json();
      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const details: PokemonDetails = await response.json();
          return { ...pokemon, details };
        })
      );
      setPokemonData(details);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Pokemon Information</h1>
      {pokemonData.map((pokemon, index) => (
        <div key={index}>
          <h2>{pokemon.name}</h2>
          {pokemon.details && (
            <>
              <p>Height: {pokemon.details.height}</p>
              <p>Weight: {pokemon.details.weight}</p>
              <p>Base Experience: {pokemon.details.base_experience}</p>
              <img
                src={pokemon.details.sprites.front_default}
                alt="Front Default"
              />
              <img
                src={pokemon.details.sprites.back_default}
                alt="Back Default"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default Pokemon;
