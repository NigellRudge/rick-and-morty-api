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
  <div className=" absolute top-2 right-2 z-[2] flex flex-row bg-gray-500/80 rounded-xl p-1">
    <span className="text-xs font-medium text-gray-100">
      {`S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}`}
    </span>
  </div>
);

const Rating = ({ rating }: { rating: number }) => (
  <div className=" absolute top-2 left-2 z-[2] flex flex-row bg-gray-500/80 rounded-xl px-2 py-1">
    <Icon iconName="star" className="text-yellow-400" size={18} />
    <span className="text-sm font-normal text-gray-200">
      {Number(rating).toFixed(1)}
    </span>
  </div>
);

const Runtime = ({ runtime }: { runtime: number }) => (
  <div className="flex flex-row items-center gap-1">
    <Icon iconName="clock" size={16} className="text-gray-300" />
    <span className="text-xs font-semibold text-gray-300">
      {runtime} minutes
    </span>
  </div>
);

const ReleaseDate = ({ releaseDate }: { releaseDate: string }) => (
  <div className="flex flex-row items-center gap-1">
    <Icon iconName="calendar" size={16} className="text-gray-300" />
    <span className="text-xs font-semibold text-gray-300">{releaseDate}</span>
  </div>
);

const EpisodeCard = ({ episode }: { episode: TMDBEpisode }) => {
  return (
    <div className="flex relative rounded-lg transform-gpu will-change-transform hover:z-10 hover:scale-[1.02] overflow-hidden group aspect-video border border-gray-700 hover:border-green-500 duration-200 ease-in-out transition-all">
      <div className="w-full h-full">
        <Image
          src={episode.still_path}
          alt={episode.still_path}
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="inset-0 z-[2] absolute bg-linear-to-b/oklch from-transparent to-gray-900">
        <div className="flex flex-col absolute left-0 right-0 bottom-0 p-2">
          <h4 className="text-lg text-gray-100 font-semibold">
            {episode.name}
          </h4>
          <div className="flex flex-row">
            <Runtime runtime={episode.runtime} />
          </div>

          <p className="text-sm text-gray-100 font-medium mt-2">
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
