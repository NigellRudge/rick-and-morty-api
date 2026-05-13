import axios, { AxiosInstance } from "axios";
import { DetailInfo } from "@/src/types/tmdb/types";
import { TMDBSeasonInfo } from "@/src/types/tmdb/season";

class TMDBAPI {
  private readonly externalId =
    process.env.NEXT_PUBLIC_RICK_AND_MORTY_EXTERNAL_ID;
  private readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private readonly mediaUrl = process.env.NEXT_PUBLIC_TMDB_MEDIA_URL;
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
      if ((await response).status !== 200) {
        return null;
      }
      return this.mapSeasonData(response.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private mapSeasonData = (season: TMDBSeasonInfo): TMDBSeasonInfo => {
    return {
      ...season,
      poster_path: `${this.mediaUrl}/${season.poster_path}`,
      episodes: season.episodes.map((episode) => ({
        ...episode,
        still_path: `${this.mediaUrl}/${episode.still_path}`,
      })),
    };
  };

  private mapDetailInformation = (detailInfo: DetailInfo): DetailInfo => {
    return {
      ...detailInfo,
      poster_path: `${this.mediaUrl}/${detailInfo.poster_path}`,
      backdrop_path: `${this.mediaUrl}/${detailInfo.backdrop_path}`,
      seasons: detailInfo.seasons.map((season) => ({
        ...season,
        poster_path: `${this.mediaUrl}/${season.poster_path}`,
      })),
    };
  };
}

export const TMDBClient = new TMDBAPI();
