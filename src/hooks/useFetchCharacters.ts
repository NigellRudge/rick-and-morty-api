import { useState } from "react";
import { Character } from "@/src/types/character";
import useSWR from "swr";
import { rickAndMortyClient } from "@/src/http/rick-and-morty-api";

const useFetchCharacters = () => {
  const [filters, setFilters] = useState<Record<string, any> | null>(null);
  const [results, setResults] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  const cacheKey = canLoadMore
    ? ["characters", page.toString(), JSON.stringify(filters)].join("-")
    : null;

  const { isValidating: isLoading } = useSWR(cacheKey, {
    fetcher: async () => {
      try {
        const response = await rickAndMortyClient.getCharacters(filters);
        if (response) {
          setCanLoadMore(Boolean(response.info.next));
          setResults((prev) => {
            if (page === 1) return response.results;
            return [...prev, ...response.results];
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchMore = (jumpToPage?: number) => {
    if (jumpToPage !== undefined) {
      setPage(jumpToPage!);
      return;
    }
    setPage((prev) => prev + 1);
  };
  return {
    filters,
    setFilters,
    page,
    setPage,
    fetchMore,
    isLoading,
    results,
  };
};

export default useFetchCharacters;
