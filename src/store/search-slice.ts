import { createSlice } from "@reduxjs/toolkit";
import { MediaState, PersonState } from "../services/MediaType";

const initialMovieState: MediaState | PersonState = {
  loading: false,
  data: [],
  page: 1,
  totalPages: 1,
  searchType: "movie",
  keyword: "",
  error: "",
  details: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialMovieState,
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload.keyword;
      state.searchType = action.payload.searchType;
    },
    getSearchResult: (state, action) => {
      state.loading = true;
      state.page = action.payload;
    },
    getSearchResultSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.results;
      state.totalPages =
        action.payload.totalPages >= 500 ? 500 : action.payload.totalPages;
      state.error = "";
    },
    getSearchResultError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
