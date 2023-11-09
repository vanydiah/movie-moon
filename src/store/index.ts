import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movie-slice";
import personSlice from "./person-slice";
import searchSlice from "./search-slice";
import tvSlice from "./tv-slice";

const store = configureStore({
  reducer: {
    movies: movieSlice,
    tv: tvSlice,
    person: personSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
