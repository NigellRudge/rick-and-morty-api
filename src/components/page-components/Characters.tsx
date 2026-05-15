import Grid from "@/src/components/Grid";
import { useCharacterPage } from "@/src/providers/CharacterPageProvider";
import Filters from "@/src/components/Filters";

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
