import Grid from "@/src/components/grid/Grid";
import SeasonInfoCarousel from "@/src/components/SeasonInfoCarousel";
import useEpisodePage from "@/hooks/useEpisodesPage";

const EpisodesPage = () => {
  const { episodes, isLoading } = useEpisodePage();
  return (
    <>
      <div className="flex flex-col gap-4 page-wrapper">
        <div>
          <SeasonInfoCarousel />
        </div>
        <h2 className="text-2xl md:text-xl font-semibold">Episodes</h2>
        <Grid items={episodes} type="episode" isLoading={isLoading} />
      </div>
    </>
  );
};

export default EpisodesPage;
