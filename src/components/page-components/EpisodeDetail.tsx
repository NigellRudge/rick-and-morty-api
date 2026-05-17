import { Character } from "@/types/rick-and-morty-api/character";
import Grid from "@/src/components/grid/Grid";
import EpisodeStillsCarousel from "@/src/components/EpisodeStillsCarousel";
import { TMDBEpisodeInfo } from "@/types/tmdb/episode";

const EpisodeDetail = ({
  episode,
  characters,
}: {
  episode: TMDBEpisodeInfo;
  characters: Character[];
}) => {
  return (
    <div className="page-wrapper flex flex-col gap-8 h-full py-4">
      <EpisodeStillsCarousel
        episode={episode}
        items={episode.images?.stills || []}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-gray-200 font-semibold">Episode Cast</h2>
        <Grid items={characters} isLoading={false} type="character" />
      </div>
    </div>
  );
};

export default EpisodeDetail;
