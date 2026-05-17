import { GetServerSideProps } from "next";
import { TMDBClient } from "@/http/tmdb-api";
import { TMDBEpisode, TMDBSeasonInfo } from "@/src/types/tmdb/season";
import Layout from "@/layout/Layout";
import EpisodePageProvider from "@/providers/EpisodePageProvider";
import EpisodesPage from "@/page-components/Episodes";

type PageProps = {
  seasons: TMDBSeasonInfo[];
  episodes: TMDBEpisode[];
  images: {
    backdrops: string[];
    posters: string[];
  };
  newSeason: TMDBSeasonInfo;
};

export default function Page({ seasons, episodes, images }: PageProps) {
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
      seasons: seasons.slice(1, 5),
      defaultEpisodes: seasons[1]?.episodes,
      images: {
        backdrops: images.backdrops.slice(0, 5),
        posters: images.posters.slice(0, 5),
      },
    },
  };
};
