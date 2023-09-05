import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenreResponse {
    count: number;
    results: Genre[];
}

const useGeneres = () => {
    const [generes, setGeneres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoding, setLoading] = useState(false);
  
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
      apiClient
        .get<FetchGenreResponse>("/genres", {signal: controller.signal})
        .then((response) => {
            setGeneres(response.data.results);
            setLoading(false);
        })
        .catch((error) => {
            if (error instanceof CanceledError) return;
            setError(error.message);
            setLoading(false);
        });

        return () => controller.abort();
    }, []);

    return {generes, error, isLoding};
}

export default useGeneres;