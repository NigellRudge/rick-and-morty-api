import { Character } from "@/src/types/character";
import { RMResponse } from "@/src/types/shared";
import { Episode } from "@/src/types/episode";
import { Location } from "@/src/types/location";
import BaseClient from "@/src/http/base-client";

export class RickAndMortyApi extends BaseClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL || "");
  }

  public getCharacters = async (filters?: any) =>
    await this.get<RMResponse<Character>>("/character");

  public getEpisodes = async (filters?: any) =>
    await this.get<RMResponse<Episode>>("/episode");

  public getLocations = async (filters?: any) =>
    await this.get<RMResponse<Location>>("/location");
}
