import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
  }
  

const useGames = (gameQuerry: GameQuery) => 
useData<Game>('/games', {
  params: {
    genres: gameQuerry.genre?.id, 
    platforms: gameQuerry.platform?.id, 
    ordering: gameQuerry.sortOrder, 
    search: gameQuerry.searchText
  }}, 
  [gameQuerry]);
    

export default useGames;