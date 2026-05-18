import Grid from "@/src/components/grid/Grid";
import Filters from "@/shared/Filters";
import useCharacterPage from "@/hooks/useCharacterPage";
import { hasItems } from "@/utils/list";

const CharactersPage = () => {
  const { isLoading, results, loadMore, totalResults, canLoadMore } =
    useCharacterPage();

  return (
    <div className="flex flex-col w-[calc(min(100vw,1600px)-32px)] gap-4 ">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Characters</h2>
      </div>
      <Filters />
      {hasItems(results) && (
        <h3 className="text-gray-400">{totalResults} Result</h3>
      )}
      <Grid
        items={results}
        type="character"
        isLoading={isLoading}
        loadMore={loadMore}
        canLoadMore={canLoadMore}
      />
    </div>
  );
};

export default CharactersPage;
