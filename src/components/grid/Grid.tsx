import { Character } from "@/types/rick-and-morty-api/character";
import { Location } from "@/types/rick-and-morty-api/location";
import CharacterCard from "@/cards/CharacterCard";
import EpisodeCard from "@/cards/EpisodeCard";
import { TMDBEpisode } from "@/types/tmdb/season";
import LoadingAnimation from "@/shared/LoadingAnimation";
import { hasItems } from "@/utils/list";
import { GridItemType } from "@/types/shared";

const LoadMoreButton = ({ onClick }: { onClick: () => void }) => (
  <div className="w-full flex items-center justify-center ">
    <button
      className="btn btn-primary rounded-xl flex items-center justify-center px-3 py-2"
      onClick={() => onClick && onClick()}
    >
      Load More
    </button>
  </div>
);

const Grid = ({
  items,
  type = "character",
  isLoading = false,
  loadMore = () => {},
  canLoadMore = true,
}: {
  items?: Character[] | Location[] | TMDBEpisode[] | null;
  type: GridItemType;
  isLoading?: boolean;
  loadMore?: () => void;
  canLoadMore?: boolean;
}) => {
  const columnLayout =
    (type === "character" &&
      "grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]") ||
    (type === "episode" &&
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4");

  if (!isLoading && !items) {
    return null;
  }

  return (
    <>
      <ul
        className={`grid ${columnLayout} overflow-y-auto no-scrollbar relative gap-3 cursor-pointer h-full`}
      >
        {hasItems(items) &&
          items?.map((item, index) => {
            switch (type) {
              case "character":
                return (
                  <li className="relative" key={`item-${item.id}-${index}`}>
                    <CharacterCard
                      priority={index <= 10}
                      character={item as Character}
                    />
                  </li>
                );
              case "episode":
                return (
                  <li className="relative" key={item.id}>
                    <EpisodeCard
                      priority={index <= 10}
                      episode={item as TMDBEpisode}
                    />
                  </li>
                );
              default:
                return null;
            }
          })}
      </ul>
      {isLoading && <LoadingAnimation />}
      {canLoadMore && <LoadMoreButton onClick={loadMore} />}
    </>
  );
};

export default Grid;
