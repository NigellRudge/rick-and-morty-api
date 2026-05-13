import EpisodesPage from "@/src/components/page-components/Episodes";
import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";
import { TMDBClient } from "@/src/http/tmdb-api";
import { SeasonShort } from "@/src/types/tmdb/types";
import { TMDBEpisode } from "@/src/types/tmdb/season";

export default function Page({
  seasons,
  episodes,
  backgroundImage,
}: {
  seasons: SeasonShort[];
  episodes: TMDBEpisode[];
  backgroundImage: string;
}) {
  return (
    <Layout backgroundImage={backgroundImage}>
      <EpisodesPage seasons={seasons} episodes={episodes} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const showInformation = await TMDBClient.getInfo();
  const firstSeason = await TMDBClient.getSeasonInfo(1);
  let backgroundImage = showInformation?.backdrop_path;
  const images = await TMDBClient.getImages();
  if (Boolean(images.backdrops) && images.backdrops.length > 0) {
    const index = Math.floor(Math.random() * images.backdrops.length);
    backgroundImage = images.backdrops[index];
  }

  if (!showInformation || !firstSeason) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      seasons: showInformation.seasons,
      defaultEpisodes: firstSeason.episodes,
      backgroundImage,
    },
  };
};
