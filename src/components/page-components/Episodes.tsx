import useFetchEpisodes from "@/src/hooks/useFetchEpisodes";
import Grid from "@/src/components/Grid";
import { SeasonShort } from "@/src/types/tmdb/types";
import { TMDBEpisode } from "@/src/types/tmdb/season";
import Image from "next/image";
import { useState } from "react";

const SeasonInfo = ({ season }: { season: SeasonShort }) => (
  <div className="flex flex-col items-center lg:items-start lg:flex-row gap-2">
    <div className="flex min-w-48 aspect-[4/6] overflow-hidden rounded-lg relative">
      <Image
        src={season.poster_path}
        alt={season.name}
        fill
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col px-0 lg:px-4 items-center lg:items-start">
      <h2 className="font-semibold text-3xl">{season.name}</h2>
      <div className="flex flex-col gap-2">
        <span className="text-md lg:text-start text-center">
          {season.overview}
        </span>
      </div>
    </div>
  </div>
);

const SeasonSwitcher = ({
  seasons,
  setSeason,
}: {
  seasons: SeasonShort[];
  setSeason: (season: SeasonShort) => void;
}) => (
  <div className="flex flex-col items-center lg:items-start">
    <fieldset className="fieldset lg:w-[350px] w-full">
      <legend className="fieldset-legend">Available Seasons</legend>
      <select
        defaultValue="1"
        className="select w-full outline-none"
        onChange={(event) => {
          const { value } = event.target;
          const selected = seasons.find(
            (s) => s.season_number === parseInt(value),
          );
          if (selected) setSeason(selected);
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

const EpisodesPage = ({
  seasons,
  episodes: defaultEpisodes,
}: {
  seasons: SeasonShort[];
  episodes?: TMDBEpisode[];
}) => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonShort>(seasons[1]);
  const { isLoading, episodes } = useFetchEpisodes({
    defaultEpisodes,
    seasonNumber: selectedSeason.season_number,
  });

  return (
    <div className="flex flex-col gap-4  pt-8 lg:pt-12">
      <SeasonInfo season={selectedSeason} />
      <SeasonSwitcher
        seasons={seasons}
        setSeason={(season) => setSelectedSeason(season)}
      />
      <Grid items={episodes} type="episode" isLoading={isLoading} />
    </div>
  );
};

export default EpisodesPage;
