import EpisodesPage from "@/src/components/page-components/Episodes";
import Layout from "@/src/components/layout/Layout";
import { GetServerSideProps } from "next";
import { TMDBClient } from "@/src/http/tmdb-api";
import { TMDBEpisode, TMDBSeasonInfo } from "@/src/types/tmdb/season";
import EpisodePageProvider from "@/src/providers/EpisodePageProvider";

export default function Page({
  seasons,
  episodes,
  images,
}: {
  seasons: TMDBSeasonInfo[];
  episodes: TMDBEpisode[];
  images: {
    backdrops: string[];
    posters: string[];
  };
  newSeason: TMDBSeasonInfo;
}) {
  return (
    <Layout>
      <EpisodePageProvider
        seasons={seasons}
        images={images}
        defaultEpisodes={episodes}
      >
        <EpisodesPage />
      </EpisodePageProvider>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const showInformation = await TMDBClient.getInfo();
  const requests: Array<Promise<TMDBSeasonInfo | null>> =
    showInformation?.seasons.map((season) => {
      return TMDBClient.getSeasonInfo(season.season_number);
    }) || [];
  const seasons = await Promise.all(requests);
  const images = await TMDBClient.getImages();

  if (!showInformation) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      seasons: seasons,
      defaultEpisodes: seasons[1]?.episodes,
      images: {
        backdrops: images.backdrops.slice(0, 5),
        posters: images.posters.slice(0, 5),
      },
    },
  };
};
