import { useState } from "react";
import useSWR from "swr";
import { TMDBEpisode } from "@/types/tmdb/season";
import { TMDBClient } from "@/http/tmdb-api";

const useFetchEpisodes = ({
  defaultEpisodes,
  seasonNumber,
}: {
  defaultEpisodes?: TMDBEpisode[];
  seasonNumber: number;
}) => {
  const [episodes, setEpisodes] = useState<TMDBEpisode[]>(
    defaultEpisodes || [],
  );
  const [page, setPage] = useState<number>(1);

  const showFetch = !Boolean(defaultEpisodes) || seasonNumber > 1;
  const cacheKey = showFetch ? ["season", seasonNumber].join("-") : null;

  const { isValidating: isLoading } = useSWR(cacheKey, {
    fetcher: async () => {
      try {
        const response = await TMDBClient.getSeasonInfo(seasonNumber);
        if (response) {
          setEpisodes(response.episodes);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return {
    page,
    setPage,
    isLoading,
    episodes,
    type: "episode",
  };
};

export default useFetchEpisodes;
