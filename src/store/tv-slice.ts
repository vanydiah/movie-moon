import { createSlice } from "@reduxjs/toolkit";
import { MediaState, SocialLinks } from "../services/MediaType";

const initialTVState = {
  popular: <MediaState>{
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

const tvSlice = createSlice({
  name: "tv",
  initialState: initialTVState,
  reducers: {
    getPopularTV: (state, action) => {
      state.popular.loading = true;
      state.popular.page = action.payload.page
        ? action.payload.page
        : state.popular.page;
    },
    getPopularTVSuccess: (state, action) => {
      state.popular.loading = false;
      state.popular.data = action.payload.results;
      state.popular.totalPages =
        action.payload.total_pages >= 500 ? 500 : action.payload.total_pages;
      state.popular.error = "";
    },
    getPopularTVError: (state, action) => {
      state.popular.loading = false;
      state.popular.error = action.payload;
    },
    getTrendingTV: (state, action) => {
      state.trending.loading = true;
      state.trending.page = action.payload.page
        ? action.payload.page
        : state.trending.page;
    },
    getTrendingTVSuccess: (state, action) => {
      state.trending.loading = false;
      state.trending.data = action.payload.results;
      state.trending.totalPages =
        action.payload.total_pages >= 500 ? 500 : action.payload.total_pages;
      state.trending.error = "";
    },
    getTrendingTVError: (state, action) => {
      state.trending.loading = false;
      state.trending.error = action.payload;
    },
    getTVDetails: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = true;
      state.details.data[mediaId] = mediaId;
    },
    getTVDetailsSuccess: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = false;
      state.details.data[mediaId] = action.payload.results;
      state.details.error = "";
    },
    getTVDetailsError: (state, action) => {
      state.details.loading = false;
      state.details.error = action.payload;
    },
    getTVCredits: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = true;
      state.details.data[mediaId].credits = {};
    },
    getTVCreditsSuccess: (state, action) => {
      const { mediaId } = action.payload;
      state.details.loading = false;
      state.details.data[mediaId].credits = action.payload.results;
    },
    getTVCreditsError: (state) => {
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

export const tvAction = tvSlice.actions;
export default tvSlice.reducer;
