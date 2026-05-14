import { TMDBSeasonInfo } from "@/src/types/tmdb/season";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Icon from "@/src/components/Icon";

const NewSeason = ({ newSeason }: { newSeason: TMDBSeasonInfo }) => {
  return (
    <div className="absolute bottom-[16px] left-[16px] right-[16px] flex flex-col mt-auto lg:max-w-[500px] z-[4] p-4 lg:items-start items-center">
      <div className="flex w-32 md:w-48 aspect-[4/6] overflow-hidden rounded-lg relative">
        <Image
          src={newSeason.poster_path}
          alt={newSeason.name}
          fill
          sizes="250px"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-3xl">{newSeason.name}</h4>
      <div className="flex flex-row gap-2">
        <span className="flex flex-row items-center p-1 gap-1">
          <Icon iconName="calendar" size={16} />
          <span className="text-gray-300 text-sm">{newSeason.air_date}</span>
        </span>
        <span className="flex flex-row items-center p-1 gap-1">
          <Icon iconName="clipboard" size={16} />
          <span className="text-gray-300 text-sm">
            {newSeason.episodes.length}
          </span>
        </span>
        <span className="text-gray-300 text-sm"></span>
      </div>
      <div className="flex flex-col mt-6">
        <p className="lg:text-base text-sm text-gray-300">
          {newSeason.overview}
        </p>
      </div>
    </div>
  );
};

const Carousel = ({
  items = [],
  delay = 3000,
  newSeason,
}: {
  items?: string[];
  delay?: number;

  newSeason: TMDBSeasonInfo;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timer = useRef<any>(null);

  useEffect(() => {
    if (!timer.current && items.length > 0) {
      timer.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev + 1 >= items.length) return 0;
          return prev + 1;
        });
      }, delay);
    }
  }, [delay, items.length]);

  if (!items || items.length == 0) return null;
  return (
    <div className=" w-full aspect-video relative rounded-b-xl lg:rounded-xl overflow-hidden h-[60vh]">
      <NewSeason newSeason={newSeason} />
      <div className="inset-0 z-[2] absolute  bg-gradient-to-t from-black via-black/70 to-gray-900/25" />
      {items.map((item, index) => (
        <div
          id={`carousel-item-${item}-${index}`}
          key={`carousel-item-${item}-${index}`}
          className={`w-full h-full absolute z-[1] ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={item}
            alt={item}
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
