import { Character } from "@/src/types/character";
import { RMResponse } from "@/src/types/shared";
import { Episode } from "@/src/types/episode";
import { Location } from "@/src/types/location";
import BaseClient from "@/src/http/base-client";
import { FilterType } from "@/src/types/filters";

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

  public getLocations = async (name: string) =>
    await this.get<RMResponse<Location>>("/location", { name });
}

export const rickAndMortyClient = new RickAndMortyApi();
