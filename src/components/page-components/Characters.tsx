import useFetchCharacters from "@/src/hooks/useFetchCharacters";
import Grid from "@/src/components/Grid";

const CharactersPage = () => {
  const { isLoading, results } = useFetchCharacters();

  return (
    <div className="flex flex-col  pt-8 lg:pt-12">
      <Grid items={results} type="character" isLoading={isLoading} />
    </div>
  );
};

export default CharactersPage;
