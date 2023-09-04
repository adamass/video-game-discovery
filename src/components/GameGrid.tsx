import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/UseGames";
import GameCard from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";

const GameGrid = () => {
  const { games, error, isLoding } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={10}>
        {isLoding &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {error && <Text>{error}</Text>}
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
