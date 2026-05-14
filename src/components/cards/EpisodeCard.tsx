import Image from "next/image";
import { TMDBEpisode } from "@/src/types/tmdb/season";
import Icon from "@/src/components/Icon";

const EpisodeNumber = ({
  season,
  episode,
}: {
  season: number;
  episode: number;
}) => (
  <div className=" absolute top-2 right-2 z-[2] flex flex-row bg-gray-500/80 rounded-xl px-2 py-1">
    <span className="text-xs font-medium text-gray-100">
      {`S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}`}
    </span>
  </div>
);

const Rating = ({ rating }: { rating: number }) => {
  if (!rating) return null;
  return (
    <div className=" absolute top-2 left-2 z-[2] flex flex-row bg-gray-500/80 rounded-xl px-2 py-1">
      <Icon iconName="star" className="text-yellow-400" size={18} />
      <span className="text-sm font-normal text-gray-200">
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
};

const Runtime = ({ runtime }: { runtime: number }) => {
  if (!runtime) return null;
  return (
    <div className="flex flex-row items-center gap-1">
      <span className="text-xs font-semibold text-gray-400">
        {runtime} minutes
      </span>
    </div>
  );
};

const ReleaseDate = ({ releaseDate }: { releaseDate: string }) => (
  <div className="flex flex-row items-center gap-1">
    <span className="text-xs font-semibold text-gray-400">
      {new Date(releaseDate).toLocaleDateString()}
    </span>
  </div>
);

const EpisodeCard = ({ episode }: { episode: TMDBEpisode }) => {
  return (
    <div className="animate-appear flex relative rounded-lg transform-gpu will-change-transform hover:z-10 hover:scale-[1.02] overflow-hidden group aspect-[6/4] border border-gray-500 hover:border-green-500 duration-200 ease-in-out transition-all">
      <div className="w-full h-full relative">
        <Image
          src={episode.still_path}
          alt={episode.still_path}
          fill
          sizes="(min-width: 768px) 350px,(min-width: 1025px) 350px, 100vw"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="inset-0 z-[2] absolute  bg-gradient-to-t from-black via-black/70 to-transparent">
        <div className="flex flex-col absolute left-0 right-0 bottom-0 p-2">
          <h4 className="lg:text-lg text-gray-300 font-semibold">
            {episode.name}
          </h4>
          <div className="flex flex-row gap-1">
            <Runtime runtime={episode.runtime} />
            <ReleaseDate releaseDate={episode.air_date} />
          </div>

          <p className="hidden sm:block text-sm text-gray-400 font-medium mt-2">
            {episode.overview}
          </p>
        </div>
      </div>
      <Rating rating={episode.vote_average} />
      <EpisodeNumber
        season={episode.season_number}
        episode={episode.episode_number}
      />
    </div>
  );
};

export default EpisodeCard;
