import { Character } from "@/src/types/character";
import { RMResponse } from "@/src/types/shared";
import { Episode } from "@/src/types/episode";
import { Location } from "@/src/types/location";
import BaseClient from "@/src/http/base-client";
import { FilterType } from "@/src/types/filters";
import { getCharacterIdsFromUrls } from "@/src/utils/list";

class RickAndMortyApi extends BaseClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL || "");
  }

  public getCharacters = async (filters?: FilterType) =>
    await this.get<RMResponse<Character>>("/character", filters);

  public getCharactersById = async (ids: number[]) => {
    if (ids.length === 0) {
      return null;
    }
    return await this.get<Array<Character>>(`/character/${ids.join(",")}`);
  };

  public getEpisodes = async (filters?: any) =>
    await this.get<RMResponse<Episode>>("/episode");

  public getEpisodeByCode = async (code: string) =>
    await this.get<RMResponse<Episode>>(`/episode?episode=${code}`);

  public getLocations = async (name: string) =>
    await this.get<RMResponse<Location>>("/location", { name });

  public getEpisodeCast = async (episodeId: string) => {
    try {
      const episodeResponse = await this.getEpisodeByCode(episodeId);
      if (!episodeResponse || episodeResponse.results.length === 0) {
        return [];
      }
      const characterIds = getCharacterIdsFromUrls(
        episodeResponse.results[0].characters,
      );
      console.log({ episodeResponse });
      if (!characterIds) return [];
      const characterResponse = await this.getCharactersById(characterIds);
      return characterResponse || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}

export const rickAndMortyClient = new RickAndMortyApi();
