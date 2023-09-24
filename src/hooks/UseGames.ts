import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>('games');



export interface Game {
    id: number;
    name: string;
    background_image: string; 
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
  }
  

const useGames = (gameQuerry: GameQuery) => useQuery<FetchResponse<Game>, Error>({
  queryKey: ['games', gameQuerry],
  queryFn: () => 
        apiClient.getAll({
          params: {
            genres: gameQuerry.genre?.id, 
            parent_platforms: gameQuerry.platform?.id, 
            ordering: gameQuerry.sortOrder, 
            search: gameQuerry.searchText
          },
        }),
});

export default useGames;