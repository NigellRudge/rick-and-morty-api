import Layout from "@/src/components/layout/Layout";
import { GetServerSideProps } from "next";
import { TMDBClient } from "@/src/http/tmdb-api";
import EpisodeDetail from "@/src/components/page-components/EpisodeDetail";
import { parseEpisodeCode } from "@/src/utils/episode";
import { rickAndMortyClient } from "@/src/http/rick-and-morty-api";
import { Character } from "@/src/types/character";
import { EpisodeInfo } from "@/src/types/episode";
import { TMDBSeasonInfo } from "@/src/types/tmdb/season";

export default function Page({
  episode,
  characters,
}: {
  episode: EpisodeInfo;
  characters: Character[];
}) {
  return (
    <Layout>
      <EpisodeDetail episode={episode} characters={characters} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { slug } = params || {};

  try {
    if (!slug) {
      throw new Error("No slug provided");
    }
    const { seasonNumber, episodeCode } = parseEpisodeCode(slug as string);
    if (!seasonNumber || !episodeCode) {
      throw new Error("invalid slug");
    }

    const season = await TMDBClient.getSeasonInfo(seasonNumber);
    const episode = await TMDBClient.getEpisodeInfo(seasonNumber, episodeCode);
    if (!episode || !season) {
      return {
        notFound: true,
      };
    }
    const characters = await rickAndMortyClient.getEpisodeCast(slug as string);

    if (!characters)
      return {
        notFound: true,
      };
    return {
      props: {
        episode: { ...episode, seasonPoster: season.poster_path },
        characters,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
