import { createContext, ReactNode, useState } from "react";
import { TMDBEpisode, TMDBSeasonInfo } from "@/types/tmdb/season";
import useFetchEpisodes from "@/hooks/useFetchEpisodes";
import useBrowserBreakpoints from "@/hooks/useBrowserBreakpoint";

type ContextType = {
  selectedSeason: TMDBSeasonInfo | null;
  setSelectedSeason: (selectedSeason: TMDBSeasonInfo) => void;
  isLoading: boolean;
  episodes: TMDBEpisode[] | null;
  carouselItems: string[];
  seasons?: TMDBSeasonInfo[];
};

export const EpisodePageContext = createContext<ContextType>({
  selectedSeason: null,
  setSelectedSeason: () => {},
  isLoading: false,
  episodes: [],
  seasons: [],
  carouselItems: [],
});

const EpisodePageProvider = ({
  children,
  defaultEpisodes,
  seasons,
  images = {
    backdrops: [],
    posters: [],
  },
}: {
  children: ReactNode;
  defaultEpisodes?: TMDBEpisode[];
  seasons: TMDBSeasonInfo[];
  images?: {
    backdrops?: string[];
    posters?: string[];
  };
}) => {
  const [selectedSeason, setSelectedSeason] = useState<TMDBSeasonInfo | null>(
    (Boolean(seasons) && seasons[1]) || null,
  );

  const { isMobileBreakpoint, isTabletBreakpoint, isSmallBreakpoint } =
    useBrowserBreakpoints();

  const { isLoading, episodes } = useFetchEpisodes({
    defaultEpisodes,
    seasonNumber: selectedSeason?.season_number || 0,
  });

  const showPosters =
    isMobileBreakpoint || isTabletBreakpoint || isSmallBreakpoint;

  const carouselItems = showPosters
    ? images.posters || images.backdrops || []
    : images.backdrops || images.posters || [];

  return (
    <EpisodePageContext.Provider
      value={{
        selectedSeason,
        setSelectedSeason,
        isLoading,
        episodes: episodes as TMDBEpisode[],
        carouselItems,
        seasons,
      }}
    >
      {children}
    </EpisodePageContext.Provider>
  );
};

export default EpisodePageProvider;
