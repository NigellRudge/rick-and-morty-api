export type Status = "unknown" | "alive" | "dead";
export type Gender = "male" | "female" | "genderless";
export type Species = "Alien" | "Human";

export type FilterType = {
  status?: Status[];
  gender?: Gender[];
  species?: Species[];
  locationName?: string;
  name?: string;
  selectedIds?: number[];
};

export const availableFilters: Partial<FilterType> = {
  gender: ["male", "female", "genderless"],
  status: ["alive", "dead", "unknown"],
  species: ["Alien", "Human"],
};
