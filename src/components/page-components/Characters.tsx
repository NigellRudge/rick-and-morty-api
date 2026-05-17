import Grid from "@/src/components/grid/Grid";
import Filters from "@/shared/Filters";
import useCharacterPage from "@/hooks/useCharacterPage";

const CharactersPage = () => {
  const { isLoading, results } = useCharacterPage();

  return (
    <div className="flex flex-col w-[calc(min(100vw,1600px)-32px)] gap-4 ">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Characters</h2>
      </div>
      <div>
        <Filters />
      </div>
      <Grid items={results} type="character" isLoading={isLoading} />
    </div>
  );
};

export default CharactersPage;
