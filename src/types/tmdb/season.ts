export interface TMDBSeasonInfo {
  _id: string;
  air_date: string;
  episodes: TMDBEpisode[];
  name: string;
  networks: Network[];
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TMDBEpisode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: GuestStar[];
}

export interface Crew {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
