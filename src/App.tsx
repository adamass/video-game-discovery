import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformIconList from "./components/PlatformIconList";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/UseGames";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

function App() {
  const [gameQuerry, setGameQuerry] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuerry.genre}
            onSelectGenre={(genre) => setGameQuerry({ ...gameQuerry, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <HStack spacing={5} marginBottom={5}>
          <PlatformSelector
            onSelectPlatform={(platform) =>
              setGameQuerry({ ...gameQuerry, platform })
            }
            selectedPlatform={gameQuerry.platform}
          />
          <SortSelector
            onSelectSortOrder={(sortOrder) =>
              setGameQuerry({ ...gameQuerry, sortOrder })
            }
            sortOrder={gameQuerry.sortOrder}
          />
        </HStack>
        <GameGrid gameQuery={gameQuerry} />
      </GridItem>
    </Grid>
  );
}

export default App;
