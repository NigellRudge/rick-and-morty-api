import EpisodesPage from "@/src/components/page-components/Episodes";
import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";
import { TMDBClient } from "@/src/http/tmdb-api";
import { SeasonShort } from "@/src/types/tmdb/types";
import { TMDBEpisode } from "@/src/types/tmdb/season";

export default function Page({
  seasons,
  episodes,
}: {
  seasons: SeasonShort[];
  episodes: TMDBEpisode[];
}) {
  return (
    <Layout>
      <EpisodesPage seasons={seasons} episodes={episodes} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const showInformation = await TMDBClient.getInfo();
  const firstSeason = await TMDBClient.getSeasonInfo(1);

  if (!showInformation || !firstSeason) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      seasons: showInformation.seasons,
      defaultEpisodes: firstSeason.episodes,
    },
  };
};
