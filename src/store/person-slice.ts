import { createSlice } from "@reduxjs/toolkit";
import {
  DetailData,
  PersonDetailState,
  PersonDetailType,
  PersonState,
  SocialLinks,
} from "../services/MediaType";

const initialPersonState = {
  popular: <PersonState>{
    loading: false,
    data: [],
    page: 1,
    totalPages: 1,
    error: "",
  },
  details: <PersonDetailState>{
    loading: false,
    data: {} as DetailData,
    error: "",
  },
};

const personSlice = createSlice({
  name: "person",
  initialState: initialPersonState,
  reducers: {
    getPopularPerson: (state, action) => {
      state.popular.loading = true;
      state.popular.page = action.payload.page
        ? action.payload.page
        : state.popular.page;
    },
    getPopularPersonSuccess: (state, action) => {
      state.popular.loading = false;
      state.popular.data = action.payload.results;
      state.popular.data = action.payload.results;
      state.popular.totalPages =
        action.payload.totalPages >= 500 ? 500 : action.payload.totalPages;
      state.popular.error = "";
    },
    getPopularPersonError: (state, action) => {
      state.popular.loading = false;
      state.popular.error = action.payload;
    },
    getPersonDetails: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = true;
      state.details.data = {};
      state.details.data[personId] = {} as PersonDetailType;
    },
    getPersonDetailsSuccess: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = false;
      state.details.data[personId] = action.payload.results;
      state.details.error = "";
    },
    getPersonDetailsError: (state, action) => {
      state.details.loading = false;
      state.details.error = action.payload;
    },
    getCombineCredits: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = true;
      state.details.data[personId].credits = {};
    },
    getCombineCreditsSuccess: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = false;
      let cast = action.payload.results.cast;
      cast = cast.filter(
        (data: any, i: number) =>
          cast.findIndex((c: any) => c.id === data.id) === i
      );
      state.details.data[personId].credits = { cast };
    },
    getCombineCreditsError: (state) => {
      state.details.loading = false;
    },
    getSocialDetails: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = true;
      state.details.data[personId].socialIds = {} as SocialLinks;
    },
    getSocialDetailsSuccess: (state, action) => {
      const { personId } = action.payload;
      state.details.loading = false;
      state.details.data[personId].socialIds = action.payload.results;
    },
    getSocialDetailsError: (state) => {
      state.details.loading = false;
    },
  },
});

export const personAction = personSlice.actions;
export default personSlice.reducer;
