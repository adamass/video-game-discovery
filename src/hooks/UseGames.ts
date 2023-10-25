import { useInfiniteQuery } from "@tanstack/react-query";
import ms from 'ms';
import APIClient, { FetchResponse } from "../services/api-client";
import useGameQueryStore from "../store";
import Game  from "../entities/Game";

const apiClient = new APIClient<Game>('games');



const useGames = () => {
  const gameQuerry = useGameQueryStore(s => s.gameQuery);
  return useInfiniteQuery<FetchResponse<Game>, Error>({
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
}

export default useGames;