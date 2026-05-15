import { TMDBSeasonInfo } from "@/src/types/tmdb/season";
import Carousel from "@/src/components/Carousel";
import useBrowserBreakpoints from "@/src/hooks/useBrowserBreakpoint";

const DiscoverPage = ({
  backdrops,
  posters,
  newSeason,
}: {
  backdrops?: string[];
  posters?: string[];
  newSeason: TMDBSeasonInfo;
}) => {
  const { isMobileBreakpoint, isTabletBreakpoint, isSmallBreakpoint } =
    useBrowserBreakpoints();
  const showPosters =
    isMobileBreakpoint || isTabletBreakpoint || isSmallBreakpoint;

  const carouselItems = showPosters ? posters : backdrops;

  return (
    <div className="w-full overflow-x-hidden">
      <Carousel items={carouselItems} newSeason={newSeason} />
    </div>
  );
};

export default DiscoverPage;
