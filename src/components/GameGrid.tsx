import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import apiClient from "../services/api-client";
import useGames from "../hooks/UseGames";

const GameGrid = () => {
  const { games, error } = useGames();

  return (
    <>
      <ul>
        {error && <Text>{error}</Text>}
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
