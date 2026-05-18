import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import Icon from "@/src/components/shared/Icon";
import ReactPlayer from "react-player";
import { setInterval } from "node:timers";
import useEpisodePage from "@/src/hooks/useEpisodesPage";
import { hasItems } from "@/utils/list";
import { Network } from "@/types/tmdb/season";

const PlayButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="absolute g hidden roup top-1/2 left-1/2 cursor-pointer -translate-x-1/2  z-[4] hover:scale-[1.05] transition-transform duration-200 ease-in-out hover:bg-gray-600 lg:flex items-center justify-center w-16 h-16 rounded-full bg-gray-600/80"
  >
    <Icon
      iconName="play"
      className="text-gray-300 group-hover:text-gray-100"
      size={24}
    />
  </div>
);

const PauseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="absolute hidden lg:group-hover:flex  top-1/2 left-1/2 cursor-pointer -translate-x-1/2  z-[4] group:hover:scale-[1.05] transition-transform duration-200 ease-in-out hover:bg-gray-600 items-center justify-center w-16 h-16 rounded-full bg-gray-600/80"
    >
      <Icon
        iconName="pause"
        className="text-gray-300 group-hover:text-gray-100"
        size={24}
      />
    </div>
  );
};

const MuteButton = ({
  onClick,
  isMuted = true,
}: {
  onClick: () => void;
  isMuted: boolean;
}) => (
  <div
    onClick={onClick}
    className="absolute group bottom-8 right-8 z-[4] cursor-pointer -translate-x-1/2 hover:scale-[1.05] transition-transform duration-200 ease-in-out hover:bg-gray-600 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-gray-600/80"
  >
    <Icon
      className="text-gray-300 group-hover:text-gray-100"
      iconName={isMuted ? "mute" : "unmute"}
      size={24}
    />
  </div>
);

const VideoPlayer = ({
  isPlaying = false,
  isMuted = true,
  videoUrl,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  videoUrl: string;
}) => {
  return (
    <div className="w-full h-full relative hidden lg:block overflow-hidden  group">
      <ReactPlayer
        muted={isMuted}
        playing={isPlaying}
        style={{
          width: "100%",
          height: "100%",
        }}
        src={videoUrl}
      />
    </div>
  );
};

const ImageCarousel = ({
  items,
  delay = 3500,
}: {
  items: string[];
  delay?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setInterval>>(null);

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

  return (
    <div className="w-full h-full relative block lg:hidden">
      <div className="inset-0 z-[2] absolute  bg-gradient-to-t from-gray-900/80 via-gray-700/70 to-gray-900/30 transition-all duration-200 ease-in-out" />
      <div className="block lg:hidden">
        {hasItems(items) &&
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

const Networks = ({ networks }: { networks?: Network[] }) => {
  if (!hasItems(networks)) return null;
  return (
    <div className="flex flex-row gap-2">
      {networks!.map((network) => (
        <div key={`${network.id}`}>
          <div className="w-24 relative h-10">
            <Image
              src={network.logo_path}
              alt={network.name + "logo"}
              sizes="70px"
              fill
              loading="eager"
              priority
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const SeasonInfo = () => {
  const { selectedSeason } = useEpisodePage();
  if (!selectedSeason) return null;
  return (
    <div className="absolute bottom-[24px] left-[16px] right-[16px] flex flex-col mt-auto lg:max-w-[75%] z-[4] p-2 sm:p-4 lg:items-start items-center">
      <div className="flex w-32  sm:w-48 aspect-[4/6] overflow-hidden rounded-lg relative">
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
      </div>

      <Networks networks={selectedSeason.networks} />
      <div className="flex flex-col mt-2 lg:mt-6">
        <p className="lg:text-base lg:text-start text-center text-sm text-gray-300">
          {selectedSeason.overview}
        </p>
      </div>
      <SeasonSwitcher />
    </div>
  );
};

const SeasonInfoCarousel = ({ delay = 3500 }: { delay?: number }) => {
  const { carouselItems: items, selectedSeason } = useEpisodePage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

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
    <div className="w-full aspect-[4/6] md:aspect-[5/6] max-h-[75vh] lg:aspect-video relative rounded-xl overflow-hidden">
      <SeasonInfo />
      <VideoPlayer
        videoUrl={carouselVideoUrl}
        isMuted={isMuted}
        isPlaying={isPlaying}
      />
      {isPlaying ? (
        <PauseButton onClick={() => setIsPlaying(false)} />
      ) : (
        <PlayButton onClick={() => setIsPlaying(true)} />
      )}
      <MuteButton
        onClick={() => setIsMuted((prev) => !prev)}
        isMuted={isMuted}
      />
      <ImageCarousel items={items} delay={delay} />
      <div className="inset-0 z-[2] absolute bg-gradient-to-t from-gray-900/80 via-gray-700/70 to-gray-900/30 transition-all duration-200 ease-in-out" />
    </div>
  );
};

export default SeasonInfoCarousel;
