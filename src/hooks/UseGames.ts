import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from 'ms';
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
  

const useGames = (gameQuerry: GameQuery) => useInfiniteQuery<FetchResponse<Game>, Error>({
  queryKey: ['games', gameQuerry],
  queryFn: ({ pageParam = 1 }) => 
        apiClient.getAll({
          params: {
            genres: gameQuerry.genreId, 
            parent_platforms: gameQuerry.platformId, 
            ordering: gameQuerry.sortOrder, 
            search: gameQuerry.searchText,
            page: pageParam
          },
        }),
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.next ? allPages.length + 1 : undefined;
  },
  staleTime: ms('24h')
});

export default useGames;