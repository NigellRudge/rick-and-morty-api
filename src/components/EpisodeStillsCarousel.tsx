import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { setInterval } from "node:timers";
import { TMDBEpisodeInfo } from "@/types/tmdb/episode";
import Icon from "@/src/components/shared/Icon";
import { hasItems } from "@/utils/list";

const EpisodeInfo = ({ episode }: { episode?: TMDBEpisodeInfo }) => {
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

const EpisodeStillsCarousel = ({
  items,
  episode,
  delay = 3500,
}: {
  items: string[];
  delay?: number;
  episode: TMDBEpisodeInfo;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!timer.current && hasItems(items)) {
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev + 1 >= items.length) return 0;
          return prev + 1;
        });
      }, delay);
    }
  }, [delay, items]);

  return (
    <div className="w-full relative min-h-[min(70vh,700px)] rounded-lg border border-gray-500 overflow-hidden">
      <EpisodeInfo episode={episode} />
      <div className="inset-0 z-[2] absolute  bg-gradient-to-t from-gray-900/80 via-gray-700/70 to-gray-900/30 transition-all duration-200 ease-in-out" />
      <div className="absolute inset-0 z-[1]">
        {items.map((item, index) => (
          <div
            id={`carousel-item-${item}-${index}`}
            key={`carousel-item-${item}-${index}`}
            className={`w-full h-full transition-opacity ease-in-out duration-300 absolute z-[1] ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={item}
              alt={item}
              className="w-full h-full object-cover object-center"
              fill
              sizes="(min-width:765px) 800px, (min-width:1025px) 100vw, 500px"
              loading="eager"
              quality="80"
            />
          </div>
        ))}
      </div>
      <div className="flex absolute bottom-0 right-0 left-0 h-12 z-[10] p-4 flex-row gap-2 items-center justify-center">
        {hasItems(items) &&
          items.map((item, index) => (
            <button
              key={`dot-item-${item}-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors ease-in-out duration-300 ${index === currentIndex ? "bg-emerald-600" : "bg-gray-600"}`}
            />
          ))}
      </div>
    </div>
  );
};

export default EpisodeStillsCarousel;
