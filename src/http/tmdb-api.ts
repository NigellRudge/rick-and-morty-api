import { AxiosInstance } from "axios";

export default class TMDBAPI {
  private readonly rickAndMortyID: string = "";
  constructor(private readonly axios: AxiosInstance) {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL || "",
    });
  }

  public async getEpisodeInfo(
    showId: number | string,
    seasonId: number | string,
    episodeNumber: number,
  ) {}
}
