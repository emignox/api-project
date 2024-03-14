import React, { useEffect, useState } from "react";
import { Pokemon, PokemonDetails } from "./types";
import { useNavigate } from "react-router-dom";

const PokemonComponent: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=200"
      );

      const data: { results: Pokemon[] } = await response.json();
      console.log(data.results);

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

  const handleClick = (pokemonName: string) => {
    navigate(`/pokemon/${pokemonName}`);
  };

  return (
    <>
      <div
        className="border border-black m-24 p-4 rounded-xl"
        style={{
          background: "#fefeda",
        }}
      >
        <h1
          className="text-center my-10 text-3xl lg:text-7xl font-black "
          style={{ color: "#df5825" }}
        >
          Welcome In Pokemon World{" "}
        </h1>
        <div className="flex flex-wrap justify-center">
          {pokemonData.map((pokemon, index) => (
            <div key={index} className="mt-6">
              {pokemon.details && (
                <div
                  className="lg:flex lg:flex-col lg:items-center lg:justify-center flex items-center flex-col justify-center   w-2/3 mx-auto h-96  shadow-2xl rounded-lg  lg:px-10"
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
                    className="bg-green-600 h-4 rounded-lg "
                    style={{
                      width: `${pokemon.details.hp}%`,
                      background: "linear-gradient(to top, #086030, #15B25E)",
                    }}
                  />
                  <div>
                    <h2
                      className="text-center text-2xl  font-bold lg:text-4xl  lg:hover:text-5xl transition-all duration-700 ease-in-out"
                      style={{ color: "#fefeda" }}
                      onClick={() => handleClick(pokemon.name)}
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}{" "}
                    </h2>
                    <p
                      className="text-2xl  text-center"
                      style={{ color: "#fefeda" }}
                    >
                      Height: {pokemon.details.height}
                    </p>
                    <p
                      className="text-2xl  text-center"
                      style={{ color: "#fefeda" }}
                    >
                      Weight: {pokemon.details.weight}
                    </p>
                    <p
                      className="text-2xl text-center"
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
      </div>
    </>
  );
};
export default PokemonComponent;
