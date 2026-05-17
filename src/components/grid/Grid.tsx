import { Character } from "@/types/rick-and-morty-api/character";
import { Location } from "@/types/rick-and-morty-api/location";
import CharacterCard from "@/cards/CharacterCard";
import EpisodeCard from "@/cards/EpisodeCard";
import { TMDBEpisode } from "@/types/tmdb/season";
import LoadingAnimation from "@/shared/LoadingAnimation";
import { hasItems } from "@/utils/list";

const GridItem = ({
  item,
  type,
}: {
  item: Character | Location | TMDBEpisode;
  type: "episode" | "location" | "character";
}) => {
  switch (type) {
    case "character":
      return (
        <li className="relative" key={item.id}>
          <CharacterCard character={item as Character} />
        </li>
      );
    case "episode":
      return (
        <li className="relative" key={item.id}>
          <EpisodeCard episode={item as TMDBEpisode} />
        </li>
      );
    default:
      return null;
  }
};

const Grid = ({
  items,
  type = "character",
  isLoading = false,
}: {
  items?: Character[] | Location[] | TMDBEpisode[] | null;
  type: "episode" | "location" | "character";
  isLoading?: boolean;
  loadMore?: () => Promise<void>;
}) => {
  const columnLayout =
    (type === "character" &&
      "grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]") ||
    (type === "episode" &&
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4");

  if (!isLoading && !items) {
    return null;
  }

  if (isLoading && (!items || items?.length === 0)) {
    return <LoadingAnimation />;
  }

  return (
    <ul
      className={`grid ${columnLayout} overflow-y-auto no-scrollbar relative gap-3 cursor-pointer px-1 py-1 h-full`}
    >
      {hasItems(items) &&
        items?.map((item) => (
          <GridItem key={item.id} item={item} type={type} />
        ))}
    </ul>
  );
};

export default Grid;
