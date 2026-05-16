import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import EpisodeInfoComponent from "@/src/components/SeasonInfo";
import { EpisodeInfo } from "@/src/types/episode";

const BaseCarousel = ({
  items,
  episode,
  delay = 3500,
}: {
  items: string[];
  delay?: number;
  episode: EpisodeInfo;
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

  return (
    <div className="w-full relative min-h-[min(70vh,700px)] rounded-lg border border-gray-500 overflow-hidden">
      <EpisodeInfoComponent episode={episode} />
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
        {items.map((item, index) => (
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

export default BaseCarousel;
