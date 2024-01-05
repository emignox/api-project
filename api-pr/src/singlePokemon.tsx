import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
}

const SinglePokemon: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data: PokemonDetails) => setPokemonDetails(data));
  }, [name]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col  lg:flex lg:flex-row  h-screen">
        <div
          className="lg:w-1/2 lg:text-center    h-full"
          style={{ backgroundColor: "#df5825" }}
        >
          <h1 className="text-4xl lg:text-9xl" style={{ color: "#fefeda" }}>
            {pokemonDetails.name.charAt(0).toUpperCase() +
              pokemonDetails.name.slice(1)}
          </h1>
          <p className="text-lg lg:text-3xl">Height: {pokemonDetails.height}</p>
          <p className="text-lg lg:text-3xl">Weight: {pokemonDetails.weight}</p>
          <p className="text-2xl lg:text-3xl">Abilities:</p>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index} className="text-lg lg:text-xl">
                {ability.ability.name}
              </li>
            ))}
          </ul>
          <p className="text-2xl lg:text-3xl">Types:</p>
          <ul>
            {pokemonDetails.types.map((type, index) => (
              <li key={index} className="text-lg lg:text-xl">
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 lg:flex lg:flex:col  justify-center items-center">
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="object-cover lg:w-3/4 "
          />
        </div>
      </div>
    </>
  );
};

export default SinglePokemon;
