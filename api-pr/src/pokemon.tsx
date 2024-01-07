import React, { useEffect, useState } from "react";
import { Pokemon, PokemonDetails } from "./types";
import { Link } from "react-router-dom";

const PokemonComponent: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=200"
      );
      const data: { results: Pokemon[] } = await response.json();
      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const details: PokemonDetails = await response.json();
          const hpStat = details.stats.find((stat) => stat.stat.name === "hp");
          const hp = hpStat
            ? hpStat.base_stat > 100
              ? 100
              : hpStat.base_stat
            : 0;
          return {
            ...pokemon,
            details: {
              ...details,
              sprites: {
                front_default: details.sprites.front_default,
                back_default: details.sprites.back_default,
                other: details.sprites.other, // Aggiungi questa linea
              },
              hp,
            },
          };
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
    <>
      <h1
        className="text-center my-10 text-3xl lg:text-7xl font-black"
        style={{ color: "#df5825" }}
      >
        Welcome In Pokemon World{" "}
      </h1>
      <div className="flex flex-wrap justify-center">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="m-4">
            {pokemon.details && (
              <div
                className="lg:flex lg:flex-col lg:items-center lg:justify-center flex items-center flex-col justify-center  mx-auto mb-20 w-72 shadow-2xl rounded-lg lg:mx-20 lg:px-10"
                style={{
                  background: "linear-gradient(to top, #df5825, #fefeda)",
                  border: "1px solid #df5825",
                }}
              >
                <img
                  className="w-72  "
                  src={pokemon.details.sprites.front_default}
                  alt="Front Default"
                />
                <p
                  className="text-2xl  text-center"
                  style={{ color: "#fefeda" }}
                >
                  HP : {pokemon.details.hp}
                </p>
                <div
                  className="bg-green-600 h-4 mb-2 rounded-lg "
                  style={{
                    width: `${pokemon.details.hp}%`,
                    background: "linear-gradient(to top, #086030, #15B25E)",
                  }}
                />
                <div>
                  <Link to={`/pokemon/${pokemon.name}`}>
                    <h2
                      className="text-center text-2xl mb-5 font-bold lg:text-4xl  lg:hover:text-5xl transition-all duration-700 ease-in-out"
                      style={{ color: "#fefeda" }}
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}{" "}
                    </h2>
                  </Link>
                  <p
                    className="text-2xl mb-5 text-center"
                    style={{ color: "#fefeda" }}
                  >
                    Height: {pokemon.details.height}
                  </p>
                  <p
                    className="text-2xl mb-5 text-center"
                    style={{ color: "#fefeda" }}
                  >
                    Weight: {pokemon.details.weight}
                  </p>
                  <p
                    className="text-2xl mb-5 text-center"
                    style={{ color: "#fefeda" }}
                  >
                    Base Experience: {pokemon.details.base_experience}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default PokemonComponent;
