import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "./inter";

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
      <div className="flex flex-col text-center text-xl lg:flex lg:flex-row lg:h-screen ">
        <div
          className="lg:w-1/2 lg:text-center lg:h-screen"
          style={{ backgroundColor: "#df5825" }}
        >
          <h1
            className="text-7xl my-7 lg:text-9xl font-black lg:my-20 "
            style={{ color: "#fefeda" }}
          >
            {pokemonDetails.name.charAt(0).toUpperCase() +
              pokemonDetails.name.slice(1)}
          </h1>
          <p
            className="text-4xl my-3 lg:text-7xl lg:mt-3 font-black lg:my-20"
            style={{ color: "#fefeda" }}
          >
            Height: {pokemonDetails.height}
          </p>
          <p
            className="text-4xl my-3 lg:text-7xl lg:mt-3 font-black"
            style={{ color: "#fefeda" }}
          >
            Weight: {pokemonDetails.weight}
          </p>
          <div className="lg:flex  my-2 lg:justify-center font-black lg:my-20">
            <p className="text-4xl lg:text-5xl" style={{ color: "#fefeda" }}>
              Abilities:
            </p>
            <ul>
              {pokemonDetails.abilities.map((ability, index) => (
                <li
                  key={index}
                  className="text-3xl lg:text-5xl text-black inline ml-4 font-black"
                >
                  {ability.ability.name.charAt(0).toUpperCase() +
                    ability.ability.name.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:flex lg:justify-center font-black lg:my-20">
            <p
              className="text-4xl lg:text-5xl font-black"
              style={{ color: "#fefeda" }}
            >
              Types:
            </p>
            <ul>
              {pokemonDetails.types.map((type, index) => (
                <li
                  key={index}
                  className="text-3xl lg:text-5xl text-black inline ml-4 font-black"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 lg:flex lg:flex-col flex justify-center items-center mx-auto  h-auto">
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            className="object-cover lg:w-3/4 animate-slowbounce  w-full my-48"
          />
        </div>
      </div>
    </>
  );
};

export default SinglePokemon;
