import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/usePlatforms";

export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder: string;
  searchText: string;
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
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) =>
            setGameQuerry({ ...gameQuerry, searchText })
          }
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenreId={gameQuerry.genreId}
            onSelectGenre={(genre) =>
              setGameQuerry({ ...gameQuerry, genreId: genre.id })
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameHeading gameQuerry={gameQuerry} />
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <PlatformSelector
              onSelectPlatform={(platform) =>
                setGameQuerry({ ...gameQuerry, platformId: platform.id })
              }
              selectedPlatformId={gameQuerry.platformId}
            />
          </Box>
          <SortSelector
            onSelectSortOrder={(sortOrder) =>
              setGameQuerry({ ...gameQuerry, sortOrder })
            }
            sortOrder={gameQuerry.sortOrder}
          />
        </Flex>
        <GameGrid gameQuery={gameQuerry} />
      </GridItem>
    </Grid>
  );
}

export default App;
