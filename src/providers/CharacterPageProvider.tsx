import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Character } from "@/src/types/character";
import useSWR from "swr";
import { rickAndMortyClient } from "@/src/http/rick-and-morty-api";
import { FilterType } from "@/src/types/filters";
import { Location } from "@/src/types/location";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";

export const availableFilters: Partial<FilterType> = {
  gender: ["male", "female", "genderless"],
  status: ["alive", "dead", "unknown"],
  species: ["Alien", "Human"],
};

type ContextType = {
  isLoading: boolean;
  results: Character[];
  setSelectedLocation: (data?: Location[]) => void;
  clearFilters: () => void;
  filters: FilterType;
  fetchMore?: (page?: number) => void;
  fetchLocations?: DebouncedFunc<
    (
      input: string,
      callBack: (input: Location[]) => void,
    ) => Promise<never[] | undefined>
  >;
  updateActiveFiltersForKey: <K extends keyof FilterType>(
    key: K,
    value: FilterType[K],
  ) => void;
};

const CharacterPageContext = createContext<ContextType>({
  isLoading: false,
  results: [],
  filters: {},
  fetchMore: () => {},
  clearFilters: () => {},
  setSelectedLocation: () => {},
  fetchLocations: debounce(async () => [], 200),
  updateActiveFiltersForKey: () => {},
});

const CharacterPageProvider = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter();
  const [results, setResults] = useState<Character[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  const name = (query?.name || "") as string;

  const { selectedFilters, cacheKey } = useMemo(() => {
    const selectedFilters = { ...filters, name };
    const cacheKey = canLoadMore
      ? ["characters", page.toString(), JSON.stringify(selectedFilters)].join(
          "-",
        )
      : null;
    return { selectedFilters, cacheKey };
  }, [canLoadMore, filters, name, page]);

  const { isValidating: isLoading, mutate } = useSWR(cacheKey, {
    fetcher: async () => {
      try {
        if (filters.selectedIds && filters?.selectedIds?.length > 0) {
          const response = await rickAndMortyClient.getCharactersById(
            filters.selectedIds,
          );
          if (response) {
            setResults(response);
          }
          return;
        }
        const response =
          await rickAndMortyClient.getCharacters(selectedFilters);

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

  const fetchLocations = useMemo(() => {
    return debounce(
      async (input: string, callBack: (input: Location[]) => void) => {
        try {
          if (!input) return;
          const response = await rickAndMortyClient.getLocations(input);
          if (response) {
            callBack(response.results || []);
            return;
          }
          return [];
        } catch (error) {
          console.log(error);
          return [];
        }
      },
    );
  }, []);

  const debouncedFetch = useMemo(
    () => debounce(fetchLocations, 200),
    [fetchLocations],
  );

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const updateActiveFiltersForKey = useCallback(
    <K extends keyof FilterType>(key: K, value: FilterType[K]) => {
      if (value === undefined) return;
      setFilters((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setFilters],
  );

  const setSelectedLocation = useCallback(
    async (locations?: Location[]) => {
      if (!locations) return;
      const characterIds = locations
        .reduce((acc: string[], current: Location) => {
          if (!current) return acc;
          const characterIds = current.residents.map((resident) =>
            resident.replace(
              `${process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL}/character/`,
              "",
            ),
          );
          if (characterIds.length === 0) return acc;
          return [...acc, ...characterIds];
        }, [])
        .map((id) => parseInt(id));
      if (!characterIds) return;
      updateActiveFiltersForKey("selectedIds", characterIds);
    },
    [updateActiveFiltersForKey],
  );

  const clearFilters = () => {
    setFilters({});
    mutate();
  };

  return (
    <CharacterPageContext.Provider
      value={{
        isLoading: isLoading,
        results,
        filters,
        fetchMore,
        fetchLocations: debouncedFetch,
        updateActiveFiltersForKey,
        setSelectedLocation,
        clearFilters,
      }}
    >
      {children}
    </CharacterPageContext.Provider>
  );
};

export default CharacterPageProvider;

export const useCharacterPage = () => useContext(CharacterPageContext);
