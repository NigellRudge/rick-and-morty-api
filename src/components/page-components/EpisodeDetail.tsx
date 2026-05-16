import { Character } from "@/src/types/character";
import Grid from "@/src/components/Grid";
import BaseCarousel from "@/src/components/BaseCarousel";
import { EpisodeInfo } from "@/src/types/episode";

const EpisodeDetail = ({
  episode,
  characters,
}: {
  episode: EpisodeInfo;
  characters: Character[];
}) => {
  return (
    <div className="page-wrapper flex flex-col gap-8 h-full py-4">
      <BaseCarousel episode={episode} items={episode.images?.stills || []} />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-gray-200 font-semibold">Episode Cast</h2>
        <Grid items={characters} isLoading={false} type="character" />
      </div>
    </div>
  );
};

export default EpisodeDetail;
