import { Character } from "@/src/types/character";
import { Location } from "@/src/types/location";
import CharacterCard from "@/src/components/cards/CharacterCard";
import EpisodeCard from "@/src/components/cards/EpisodeCard";
import LocationCard from "@/src/components/cards/LocationCard";
import SkeletonCard from "@/src/components/cards/SkeletonCard";
import { TMDBEpisode } from "@/src/types/tmdb/season";

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
    case "location":
      return (
        <li className="relative" key={item.id}>
          <LocationCard location={item as Location} />
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
  loadMore,
}: {
  items: Character[] | Location[] | TMDBEpisode[];
  type: "episode" | "location" | "character";
  isLoading?: boolean;
  loadMore?: () => Promise<void>;
}) => {
  const renderSkeletons = () =>
    Array(50)
      .fill(0)
      .map((_, i) => (
        <li key={i}>
          <SkeletonCard type={type} />
        </li>
      ));
  const columnLayout =
    (type === "character" &&
      "grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]") ||
    (type === "episode" &&
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4");

  if (isLoading && items.length === 0) {
    return (
      <ul
        className={`grid ${columnLayout} overflow-y-auto no-scrollbar relative gap-3 cursor-pointer px-1 py-1 h-full`}
      >
        {renderSkeletons()}
      </ul>
    );
  }

  return (
    <ul
      className={`grid ${columnLayout} overflow-y-auto no-scrollbar relative gap-3 cursor-pointer px-1 py-1 h-full`}
    >
      {items?.length > 0 &&
        items?.map((item) => (
          <GridItem key={item.id} item={item} type={type} />
        ))}
    </ul>
  );
};

export default Grid;
