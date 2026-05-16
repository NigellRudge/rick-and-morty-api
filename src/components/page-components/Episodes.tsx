import Grid from "@/src/components/Grid";
import Carousel from "@/src/components/Carousel";
import { useEpisodePage } from "@/src/providers/EpisodePageProvider";

const EpisodesPage = () => {
  const { episodes, isLoading } = useEpisodePage();
  return (
    <>
      <div className="flex flex-col gap-4 md:pt-0 pt-4 page-wrapper">
        <div>
          <Carousel />
        </div>
        <h2 className="text-2xl md:text-xl font-semibold">Episodes</h2>
        <Grid items={episodes} type="episode" isLoading={isLoading} />
      </div>
    </>
  );
};

export default EpisodesPage;
