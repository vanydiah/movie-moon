import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMedia, fetchTrending } from "../services/fetchMedia";
import { RootState } from "../store";
import { movieAction } from "../store/movie-slice";
import { tvAction } from "../store/tv-slice";
import { MediaParamTypes } from "../services/MediaType";
import HomeMediaWrapper from "../components/home/HomeMediaWrapper";

const HomePage: React.FC = () => {
  const movieState = useSelector((state: RootState) => state.movies);
  const tvState = useSelector((state: RootState) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      movieState.nowPlaying.data.length === 0 ||
      movieState.nowPlaying.page > 1
    ) {
      fetchNowPlayingMovies();
    }
    if (movieState.popular.data.length === 0 || movieState.popular.page > 1) {
      fetchPopularMovies();
    }
    if (movieState.trending.data.length === 0 || movieState.trending.page > 1) {
      fetchTrendingAll();
    }
    if (tvState.popular.data.length === 0 || tvState.popular.page > 1) {
      fetchPopularTV();
    }
  }, []);

  const fetchNowPlayingMovies = useCallback(async () => {
    dispatch(movieAction.getNowPlayingMovie({ page: 1 }));
    const data = await fetchMedia("movie", "now_playing");
    if (!data.success) {
      dispatch(movieAction.getNowPlayingMovieError(data.error));
      return;
    }

    dispatch(movieAction.getNowPlayingMovieSuccess(data.results));
  }, []);

  const fetchPopularMovies = useCallback(async () => {
    dispatch(movieAction.getPopularMovie({ page: 1 }));
    const data = await fetchMedia("movie", "popular");
    if (!data.success) {
      dispatch(movieAction.getPopularMovieError(data.error));
      return;
    }

    dispatch(movieAction.getPopularMovieSuccess(data.results));
  }, []);

  const fetchPopularTV = useCallback(async () => {
    dispatch(tvAction.getPopularTV({ page: 1 }));
    const data = await fetchMedia("tv", "popular");
    if (!data.success) {
      dispatch(tvAction.getPopularTVError(data.error));
      return;
    }

    dispatch(tvAction.getPopularTVSuccess(data.results));
  }, []);

  const fetchTrendingAll = useCallback(async () => {
    dispatch(movieAction.getTrendingMovie({ page: 1 }));
    const data = await fetchTrending("all");
    if (!data.success) {
      dispatch(movieAction.getTrendingMovieError(data.error));
      return;
    }

    dispatch(movieAction.getTrendingMovieSuccess(data.results));
  }, []);

  return (
    <div className="container py-4">
      <div className="row pl-0">
        <HomeMediaWrapper
          data={movieState.nowPlaying}
          mediaType={MediaParamTypes.Movie}
          mediaHeading="Now Playing"
        />
      </div>
      <div className="row pt-5 pl-0">
        <HomeMediaWrapper
          data={movieState.popular}
          mediaType={MediaParamTypes.Movie}
          mediaHeading="Popular Movies"
        />
      </div>
      <div className="row pt-5 pl-0">
        <HomeMediaWrapper
          data={tvState.popular}
          mediaType={MediaParamTypes.TV}
          mediaHeading="Popular TV Shows"
        />
      </div>
      <div className="row pt-5 pl-0">
        <HomeMediaWrapper
          data={movieState.trending}
          mediaType={MediaParamTypes.TV}
          mediaHeading="Trending"
        />
      </div>
    </div>
  );
};

export default React.memo(HomePage);
