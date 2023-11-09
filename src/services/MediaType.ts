export interface MediaState {
  loading: boolean;
  data: Array<MediaItemType>;
  page: number;
  totalPages: number;
  searchType?: string;
  keyword?: string;
  error?: string;
  details?: any;
}
export interface MediaItemType {
  id: number;
  title: string;
  release_date: string;
  first_air_date: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  media_type?: string;
  bigPoster?: boolean;
  name: string;
  original_name: string;
  overview: string;
  genre_ids: number[];
}
export interface PersonState {
  loading: boolean;
  data: Array<PersonItemType>;
  page: number;
  totalPages: number;
  searchType?:
    | MediaParamTypes.Movie
    | MediaParamTypes.Person
    | MediaParamTypes.Person;
  keyword?: string;
  error?: string;
}
export interface PersonItemType {
  id: number;
  gender: string;
  known_for: Array<MediaItemType>;
  known_for_department: string;
  name: string;
  profile_path: string;
  popularity: number;
}
export interface PersonDetailState {
  loading: boolean;
  data: DetailData;
  error?: string;
}
export interface DetailData {
  [key: number]: PersonDetailType;
}
export interface PersonDetailType {
  id: number;
  biography?: string;
  birthday?: string;
  deathday?: string;
  homepage?: string;
  gender?: string;
  imdb_id?: string;
  known_for_department?: string;
  name?: string;
  place_of_birth?: string;
  profile_path?: string;
  popularity?: number;
  credits?: {
    cast?: Array<any>;
  };
  socialIds: SocialLinks;
}
export type SocialLinks = {
  facebook_id?: string;
  imdb_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  linkedin_id?: string;
  github_id?: string;
};

export interface MediaResponse {
  success: boolean;
  totalPages?: number;
  page?: number;
  results: any;
  error?: string;
}

export enum TimeWindowTypes {
  day = "day",
  week = "week",
}
export enum MediaParamTypes {
  Movie = "movie",
  TV = "tv",
  Person = "person",
  All = "all",
}
export enum FilterTypes {
  NowPlaying = "now-playing",
  Popular = "popular",
  Trending = "trending",
}
export enum CreditTypes {
  Credit = "credits",
  CumbineCredit = "combined_credits",
  ExternalId = "external_ids",
}
