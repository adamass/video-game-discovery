import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import apiClient from "../services/api-client";
import { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";



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
        apiClient
        .get<FetchResponse<Game>>('games', {
          params: {
            genres: gameQuerry.genre?.id, 
            parent_platforms: gameQuerry.platform?.id, 
            ordering: gameQuerry.sortOrder, 
            search: gameQuerry.searchText
          }
        })
        .then(response => response.data) 
})

export default useGames;