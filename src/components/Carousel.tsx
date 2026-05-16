import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import Icon from "@/src/components/Icon";
import ReactPlayer from "react-player";
import { useEpisodePage } from "@/src/providers/EpisodePageProvider";

const SeasonSwitcher = () => {
  const { seasons, setSelectedSeason } = useEpisodePage();
  if (!seasons) return null;
  return (
    <div className="flex flex-col items-center lg:items-start lg:w-[350px] w-full">
      <fieldset className="fieldset  w-full">
        <select
          defaultValue="1"
          className="select w-full outline-none"
          onChange={(event) => {
            const { value } = event.target;
            const selected = seasons.find(
              (s) => s.season_number === parseInt(value),
            );
            if (selected) setSelectedSeason(selected);
          }}
        >
          <option disabled={true}>Pick a season</option>
          {seasons.map((season) => (
            <option className="" value={season.season_number} key={season.id}>
              {season.name}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};

const SeasonInfo = () => {
  const { selectedSeason } = useEpisodePage();
  if (!selectedSeason) return null;
  return (
    <div className="absolute bottom-[24px] left-[16px] right-[16px] flex flex-col mt-auto lg:max-w-[75%] z-[4] p-2 sm:p-4 lg:items-start items-center">
      <div className="flex w-48 aspect-[4/6] overflow-hidden rounded-lg relative">
        <Image
          src={selectedSeason.poster_path}
          alt={selectedSeason.name}
          fill
          sizes="250px"
          loading="eager"
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-3xl">{selectedSeason.name}</h4>
      <div className="flex flex-row gap-2">
        <span className="flex flex-row items-center p-1 gap-1">
          <Icon iconName="calendar" size={16} />
          <span className="text-gray-300 text-sm">
            {selectedSeason.air_date}
          </span>
        </span>
        <span className="flex flex-row items-center p-1 gap-1">
          <Icon iconName="clipboard" size={16} />
          <span className="text-gray-300 text-sm">
            {selectedSeason.episodes.length}
          </span>
        </span>
        <span className="text-gray-300 text-sm"></span>
      </div>
      <div className="flex flex-col mt-6">
        <p className="lg:text-base lg:text-start text-center text-sm text-gray-300">
          {selectedSeason.overview}
        </p>
      </div>

      <SeasonSwitcher />
    </div>
  );
};

const Carousel = ({ delay = 3500 }: { delay?: number }) => {
  const { carouselItems: items, selectedSeason } = useEpisodePage();
  const hasItems = Boolean(items) && items.length !== 0;

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

  const carouselVideoUrl: string = useMemo(() => {
    let youtubeKey = process.env.NEXT_PUBLIC_RICK_AND_MORTY_YT_TRAILER_KEY;
    if (Boolean(selectedSeason) && selectedSeason?.videos) {
      const video = selectedSeason?.videos?.find(
        (video) => video.site.toLowerCase() === "youtube",
      );
      if (video) {
        youtubeKey = video.key;
      }
    }
    return `${process.env.NEXT_PUBLIC_YOUTUBE_URL}${youtubeKey}`;
  }, [selectedSeason]);

  return (
    <div className="w-full aspect-[4/6] md:aspect-[5/6] max-h-[70vh] lg:aspect-video md:max-h-[50vh] relative rounded-b-xl lg:rounded-xl overflow-hidden  group">
      <SeasonInfo />
      <div className="hidden lg:block h-full">
        <ReactPlayer
          muted={true}
          playing={false}
          style={{
            width: "100%",
            height: "100%",
          }}
          src={carouselVideoUrl}
        />
      </div>
      <div className="inset-0 z-[2] absolute  bg-gradient-to-t from-gray-900/80 via-gray-700/70 to-gray-900/30 transition-all duration-200 ease-in-out" />
      <div className="block lg:hidden">
        {hasItems &&
          items.map((item, index) => (
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
                sizes="(min-width:765px) 600px, (min-width:1025px) 90vw, 400px"
                loading="eager"
                quality="80"
              />
            </div>
          ))}
      </div>
      <div className="flex lg:hidden absolute bottom-0 right-0 left-0 h-12 z-[10] p-4 flex-row gap-2 items-center justify-center">
        {hasItems &&
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

export default Carousel;
