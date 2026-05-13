export interface MediaResponse {
  backdrops: Media[];
  id: number;
  logos: Media[];
  posters: Media[];
}

export interface Media {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
