import { createSlice } from "@reduxjs/toolkit";
import { MediaState, SocialLinks } from "../services/MediaType";

const initialMovieState = {
  popular: <MediaState>{
    loading: false,
    data: [],
    page: 1,
    totalPages: 1,
    error: "",
  },
  nowPlaying: <MediaState>{
    loading: false,
    data: [],
    page: 1,
    totalPages: 1,
    error: "",
  },
  trending: <MediaState>{
    loading: false,
    data: [],
    page: 1,
    totalPages: 1,
    error: "",
  },
  details: <any>{
    loading: false,
    data: {},
    error: "",
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialMovieState,
  reducers: {
    getPopularMovie: (state, action) => {
      state.popular.loading = true;
      state.popular.page = action.payload.page
        ? action.payload.page
        : state.popular.page;
    },
    getPopularMovieSuccess: (state, action) => {
      state.popular.loading = false;
      state.popular.data = action.payload.results;
      state.popular.totalPages =
        action.payload.total_pages >= 500 ? 500 : action.payload.total_pages;
      state.popular.error = "";
    },
    getPopularMovieError: (state, action) => {
      state.popular.loading = false;
      state.popular.page =
        state.popular.page === 1 ? state.popular.page : state.popular.page - 1;
      state.popular.error = action.payload;
    },
    getNowPlayingMovie: (state, action) => {
      state.nowPlaying.loading = true;
      state.nowPlaying.page = action.payload.page
        ? action.payload.page
        : state.nowPlaying.page;
    },
    getNowPlayingMovieSuccess: (state, action) => {
      state.nowPlaying.loading = false;
      state.nowPlaying.data = action.payload.results;
      state.nowPlaying.totalPages =
        action.payload.total_pages >= 500 ? 500 : action.payload.total_pages;
    },
    getNowPlayingMovieError: (state, action) => {
      state.nowPlaying.loading = false;
      state.nowPlaying.error = action.payload;
    },
    getTrendingMovie: (state, action) => {
      state.trending.loading = true;
      state.trending.page = action.payload.page
        ? action.payload.page
        : state.trending.page;
    },
    getTrendingMovieSuccess: (state, action) => {
      state.trending.loading = false;
      state.trending.data = action.payload.results;
      state.trending.totalPages =
        action.payload.total_pages >= 500 ? 500 : action.payload.total_pages;
      state.trending.error = "";
    },
    getTrendingMovieError: (state, action) => {
      state.trending.loading = false;
      state.trending.error = action.payload;
    },
    getMovieDetails: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = true;
      state.details.data[mediaId] = mediaId;
    },
    getMovieDetailsSuccess: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = false;
      state.details.data[mediaId] = action.payload.results;
      state.details.error = "";
    },
    getMovieDetailsError: (state, action) => {
      state.details.loading = false;
      state.details.error = action.payload;
    },
    getMovieCredits: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = true;
      state.details.data[mediaId].credits = {};
    },
    getMovieCreditsSuccess: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = false;
      state.details.data[mediaId].credits = action.payload.results;
    },
    getMovieCreditsError: (state) => {
      state.details.loading = false;
    },
    getSocialDetails: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = true;
      state.details.data[mediaId].socialIds = {} as SocialLinks;
    },
    getSocialDetailsSuccess: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = false;
      state.details.data[mediaId].socialIds = action.payload.results;
    },
    getSocialDetailsError: (state) => {
      state.details.loading = false;
    },
  },
});

export const movieAction = movieSlice.actions;
export default movieSlice.reducer;
