import { MediaResponse, TimeWindowTypes } from "./MediaType";

const endpoint = "https://api.themoviedb.org/3/";
const api_key = process.env.REACT_APP_TMDB_API_KEY;

const http = async (url: string): Promise<MediaResponse> => {
  try {
    const response = await fetch(endpoint + url);
    if (!response.ok) {
      return {
        success: false,
        results: [],
        error: "Something went wrong.",
      };
    }
    const data = await response.json();

    return {
      success: true,
      results: data,
    };
  } catch (error) {
    return {
      success: false,
      results: [],
      error: "Something went wrong.",
    };
  }
};

// fetch movies/tv shows by filter type: popular, trending etc.
const fetchMedia = (
  mediaType: string,
  filterType: string,
  offset: number = 1,
  search?: boolean,
  keyword?: string
) => {
  let params = "";
  if (search && keyword !== "") {
    params += `search/${mediaType}?api_key=${api_key}&query=${keyword};`;
  } else {
    params += `${mediaType}/${filterType}?api_key=${api_key}`;
  }

  const url = `${params}&language=en-US&page=${offset}`;
  return http(url);
};

// fetch trending movie/tv show/people
const fetchTrending = (mediaType: string, offset: number = 1) => {
  const timeWindow: TimeWindowTypes = TimeWindowTypes.week;
  let url = `trending/${mediaType}/${timeWindow}?api_key=${api_key}&language=en-US&page=${offset}`;
  return http(url);
};

// fetch movie/tv show details by id
const fetchDetails = (mediaType: string, id: number) => {
  let url = `${mediaType}/${id}?api_key=${api_key}&language=en-US`;
  return http(url);
};

// fetch fredits for movies/tv shows by id
const fetchCredits = (mediaType: string, id: number, creditType: string) => {
  let url = `${mediaType}/${id}/${creditType}?api_key=${api_key}&language=en-US`;
  return http(url);
};

// search for movies/tv shows by keywords
const fetchSearch = (mediaType: string, query: string, offset: number = 1) => {
  let url = `search/${mediaType}?query=${encodeURIComponent(
    query
  )}&api_key=${api_key}&language=en-US&page=${offset}`;
  return http(url);
};

export { fetchMedia, fetchTrending, fetchCredits, fetchDetails, fetchSearch };
