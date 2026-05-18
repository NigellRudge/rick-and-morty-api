import axios, { AxiosInstance } from "axios";
import { DetailInfo } from "@/types/tmdb/types";
import { TMDBSeasonInfo } from "@/types/tmdb/season";
import { MediaResponse, Video, VideoResponse } from "@/types/tmdb/media";
import { TMDBEpisodeInfo } from "@/types/tmdb/episode";
import { hasItems } from "@/utils/list";

class TMDBAPI {
  private readonly externalId =
    process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID;
  private readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private readonly mediaUrl = process.env.NEXT_PUBLIC_TMDB_MEDIA_URL;
  private readonly mediaUrlLarge = process.env.NEXT_PUBLIC_TMDB_MEDIA_URL_LARGE;
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL || "",
    });
  }

  public async getInfo(): Promise<DetailInfo | null> {
    try {
      const response = await this.axios.get<DetailInfo>(
        `/tv/${this.externalId}`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return null;
      }
      return this.mapDetailInformation(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getSeasonInfo(
    seasonNumber: number,
  ): Promise<TMDBSeasonInfo | null> {
    try {
      const response = await this.axios.get<TMDBSeasonInfo>(
        `/tv/${process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID}/season/${seasonNumber}`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return null;
      }
      return this.mapSeasonData(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getSeasonVideos(seasonNumber: number): Promise<Video[] | null> {
    try {
      const response = await this.axios.get<VideoResponse>(
        `/tv/${process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID}/season/${seasonNumber}/videos`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return null;
      }
      return response.data.results;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getEpisodeInfo(
    seasonNumber: number,
    episodeNumber: number,
  ): Promise<TMDBEpisodeInfo | null> {
    try {
      const response = await this.axios.get<TMDBEpisodeInfo>(
        `/tv/${process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID}/season/${seasonNumber}/episode/${episodeNumber}`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return null;
      }
      const images = await this.getEpisodeImages(
        response.data.season_number,
        response.data.episode_number,
      );
      if (images?.stills && hasItems(images?.stills)) {
        response.data.images = images;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private mapSeasonData = async (
    season: TMDBSeasonInfo,
  ): Promise<TMDBSeasonInfo> => {
    return {
      ...season,
      videos: (await this.getSeasonVideos(season.season_number))!,
      poster_path: `${this.mediaUrl}${season.poster_path}`,
      networks: season.networks.map((network) => {
        return {
          ...network,
          logo_path: `${this.mediaUrl}${network.logo_path}`,
        };
      }),
      episodes: season.episodes.map((episode) => ({
        ...episode,
        overview:
          episode.overview?.length > 120
            ? episode.overview?.slice(0, 120).concat("...")
            : episode.overview,
        still_path: Boolean(episode.still_path)
          ? `${this.mediaUrl}${episode.still_path}`
          : "/imgs/fallback.webp",
      })),
    };
  };

  private mapDetailInformation = (detailInfo: DetailInfo): DetailInfo => {
    return {
      ...detailInfo,
      poster_path: `${this.mediaUrl}${detailInfo.poster_path}`,
      backdrop_path: `${this.mediaUrl}${detailInfo.backdrop_path}`,
      seasons: detailInfo.seasons.map((season) => ({
        ...season,
        poster_path: `${this.mediaUrl}${season.poster_path}`,
      })),
    };
  };

  private mapMedia = (
    mediaResponse: MediaResponse,
  ): {
    backdrops: string[];
    posters: string[];
    stills: string[];
  } => {
    return {
      backdrops: mediaResponse.backdrops
        ? mediaResponse.backdrops.map(
            (backdrop) => `${this.mediaUrlLarge}${backdrop.file_path}`,
          )
        : [],
      posters: mediaResponse.posters
        ? mediaResponse.posters.map(
            (poster) => `${this.mediaUrlLarge}${poster.file_path}`,
          )
        : [],
      stills: mediaResponse.stills
        ? mediaResponse.stills.map(
            (poster) => `${this.mediaUrlLarge}${poster.file_path}`,
          )
        : [],
    };
  };

  public async getImages(): Promise<{
    backdrops: string[];
    posters: string[];
  }> {
    try {
      const response = await this.axios.get<MediaResponse>(
        `/tv/${process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID}/images`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return {
          backdrops: [],
          posters: [],
        };
      }
      return this.mapMedia(response.data);
    } catch (error) {
      console.log(error);
      return {
        backdrops: [],
        posters: [],
      };
    }
  }

  public async getEpisodeImages(
    seasonNumber: string | number,
    episodeNumber: string | number,
  ): Promise<{
    backdrops: string[];
    posters: string[];
    stills?: string[];
  }> {
    try {
      const response = await this.axios.get<MediaResponse>(
        `/tv/${process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID}/season/${seasonNumber}/episode/${episodeNumber}/images`,
        { params: { api_key: this.apiKey } },
      );
      if (response.status !== 200) {
        return {
          backdrops: [],
          posters: [],
          stills: [],
        };
      }
      return this.mapMedia(response.data);
    } catch (error) {
      console.log(error);
      return {
        backdrops: [],
        posters: [],
        stills: [],
      };
    }
  }
}

export const TMDBClient = new TMDBAPI();
