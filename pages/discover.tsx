import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";
import { TMDBClient } from "@/src/http/tmdb-api";
import DiscoverPage from "@/src/components/page-components/DiscoverPage";
import { TMDBSeasonInfo } from "@/src/types/tmdb/season";

export default function Page({
  backdrops,
  posters,
  newSeason,
}: {
  backdrops: string[];
  posters: string[];
  newSeason: TMDBSeasonInfo;
}) {
  return (
    <Layout showNavigationOverContent>
      <DiscoverPage
        newSeason={newSeason}
        backdrops={backdrops}
        posters={posters}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const images = await TMDBClient.getImages();
  const newSeason = await TMDBClient.getSeasonInfo(9);

  if (!newSeason || !images) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      newSeason,
      backdrops: images.backdrops.slice(0, 5),
      posters: images.posters.slice(0, 5),
    },
  };
};
