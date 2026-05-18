import { Character } from "@/types/rick-and-morty-api/character";
import { Response } from "@/types/rick-and-morty-api/shared";
import { Episode } from "@/types/rick-and-morty-api/episode";
import { Location } from "@/types/rick-and-morty-api/location";
import { FilterType } from "@/types/filters";
import { getCharacterIdsFromUrls } from "@/utils/list";
import axios, { AxiosInstance } from "axios";
import * as querystring from "node:querystring";

class RickAndMortyApi {
  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL || "",
    });
  }

  public getCharacters = async (filters?: FilterType) =>
    await this.get<Response<Character>>("/character", filters);

  public getCharactersById = async (ids: number[]) => {
    if (ids.length === 0) {
      return null;
    }
    return await this.get<Array<Character>>(`/character/${ids.join(",")}`);
  };

  public getEpisodeByCode = async (code: string) =>
    await this.get<Response<Episode>>(`/episode?episode=${code}`);

  public getLocations = async (name: string) =>
    await this.get<Response<Location>>("/location", { name });

  public getEpisodeCast = async (episodeId: string) => {
    try {
      const episodeResponse = await this.getEpisodeByCode(episodeId);
      if (!episodeResponse || episodeResponse.results.length === 0) {
        return [];
      }
      const characterIds = getCharacterIdsFromUrls(
        episodeResponse.results[0].characters,
      );
      if (!characterIds) return [];
      const characterResponse = await this.getCharactersById(characterIds);
      return characterResponse || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  private async get<T>(url: string, params?: FilterType): Promise<T | null> {
    try {
      const response = await this.axiosClient.get<T>(
        `${url}?${querystring.stringify(params)}`,
      );
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const rickAndMortyClient = new RickAndMortyApi();
