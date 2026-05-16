import Image from "next/image";
import Icon from "@/src/components/Icon";
import { EpisodeInfo } from "@/src/types/episode";

const EpisodeInfoComponent = ({ episode }: { episode?: EpisodeInfo }) => {
  if (!episode) return null;
  return (
    <div className="absolute bottom-[24px] left-[16px] right-[16px] flex flex-col  lg:max-w-[75%] z-[4] p-2 sm:p-4 lg:items-start items-center">
      <div className="flex w-40 lg:w-52 aspect-[4/6] overflow-hidden rounded-lg relative">
        <Image
          src={episode.seasonPoster!}
          alt={`season ${episode.season_number} poster`}
          fill
          sizes="250px"
          loading="eager"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <h4 className="text-3xl">{episode.name}</h4>
        <div className="flex flex-row">
          <span className="flex flex-row items-center p-1 gap-1">
            <Icon iconName="calendar" size={16} />
            <span className="text-gray-300 text-sm">{episode.air_date}</span>
          </span>
          <span className="flex flex-row items-center p-1 gap-1">
            <Icon iconName="clock" size={16} />
            <span className="text-gray-300 text-sm">
              {episode.runtime} minutes
            </span>
          </span>
        </div>

        <span className="text-gray-300 text-sm"></span>
      </div>
      <div className="flex flex-col mt-6">
        <p className="lg:text-base lg:text-start text-center text-sm text-gray-300">
          {episode.overview}
        </p>
      </div>
    </div>
  );
};

export default EpisodeInfoComponent;
