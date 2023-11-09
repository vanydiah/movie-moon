import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchMedia, fetchTrending } from "../../services/fetchMedia";
import { FilterTypes, MediaParamTypes } from "../../services/MediaType";
import { RootState } from "../../store";
import { movieAction } from "../../store/movie-slice";
import { loadNextPage, loadPrevPage } from "../../utilities";
import { AllMediaList } from "../common/AllMediaListing";
import Button from "../Layout/Button";
import Error from "../Layout/Error";
import Loader from "../Layout/Loader";

const MovieListing: React.FC = (props) => {
  const location = useLocation();
  const mediaParams = location.pathname.split("/");
  const filterType = mediaParams[2];

  const dispatch = useDispatch();
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const movieState = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (
      filterType === FilterTypes.NowPlaying &&
      movieState.nowPlaying.data.length === 0
    ) {
      fetchNowPlayingMovies();
      setDisablePrev(true);
    } else {
      movieState.nowPlaying.page > 1 &&
        movieState.nowPlaying.totalPages !== 1 &&
        fetchNowPlayingMovies(1);
      setDisableNext(false);
    }
    if (
      filterType === FilterTypes.Popular &&
      movieState.popular.data.length === 0
    ) {
      fetchPopularMovies();
      setDisablePrev(true);
    } else {
      movieState.popular.page > 1 &&
        movieState.popular.totalPages !== 1 &&
        fetchPopularMovies(1);
      setDisableNext(false);
    }
    if (
      filterType === FilterTypes.Trending &&
      movieState.trending.data.length === 0
    ) {
      fetchTrendingMovies();
      setDisablePrev(true);
    } else {
      movieState.trending.page > 1 &&
        movieState.trending.totalPages !== 1 &&
        fetchTrendingMovies(1);
      setDisableNext(false);
    }
  }, [filterType]);

  const fetchNowPlayingMovies = useCallback(async (page: number = 1) => {
    dispatch(movieAction.getNowPlayingMovie({ page }));
    const data = await fetchMedia(MediaParamTypes.Movie, "now_playing", page);
    if (!data.success) {
      dispatch(movieAction.getNowPlayingMovieError(data.error));
      return;
    }

    dispatch(movieAction.getNowPlayingMovieSuccess(data.results));
  }, []);

  const fetchPopularMovies = useCallback(async (page: number = 1) => {
    dispatch(movieAction.getPopularMovie({ page }));
    const data = await fetchMedia(
      MediaParamTypes.Movie,
      FilterTypes.Popular,
      page
    );
    if (!data.success) {
      dispatch(movieAction.getPopularMovieError(data.error));
      return;
    }

    dispatch(movieAction.getPopularMovieSuccess(data.results));
  }, []);

  const fetchTrendingMovies = useCallback(async (page: number = 1) => {
    dispatch(movieAction.getTrendingMovie({ page }));
    const data = await fetchTrending(MediaParamTypes.Movie, page);
    if (!data.success) {
      dispatch(movieAction.getTrendingMovieError(data.error));
      return;
    }

    dispatch(movieAction.getTrendingMovieSuccess(data.results));
  }, []);

  const loadPrev = (filterType: string, first: boolean = false) => {
    if (filterType === FilterTypes.Popular) {
      let page = movieState.popular.page;
      loadPrevPage(page, fetchPopularMovies, first);
      first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
      page - 1 < movieState.popular.totalPages && setDisableNext(false);
    }

    if (filterType === FilterTypes.NowPlaying) {
      let page = movieState.nowPlaying.page;
      loadPrevPage(page, fetchNowPlayingMovies, first);
      first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
      page - 1 < movieState.nowPlaying.totalPages && setDisableNext(false);
    }

    if (filterType === FilterTypes.Trending) {
      let page = movieState.trending.page;
      loadPrevPage(page, fetchTrendingMovies, first);
      first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
      page - 1 < movieState.trending.totalPages && setDisableNext(false);
    }
  };

  const loadNext = (filterType: string, last: boolean = false) => {
    setDisablePrev(false);
    if (filterType === FilterTypes.Popular) {
      const page = movieState.popular.page + 1;
      loadNextPage(
        page,
        fetchPopularMovies,
        last,
        movieState.popular.totalPages
      );
      if (page === movieState.popular.totalPages) {
        last = true;
      }
      last ? setDisableNext(true) : setDisableNext(false);
    }

    if (filterType === FilterTypes.NowPlaying) {
      const page = movieState.nowPlaying.page + 1;
      loadNextPage(
        page,
        fetchNowPlayingMovies,
        last,
        movieState.nowPlaying.totalPages
      );
      if (page === movieState.nowPlaying.totalPages) {
        last = true;
      }
      last ? setDisableNext(true) : setDisableNext(false);
    }

    if (filterType === FilterTypes.Trending) {
      const page = movieState.trending.page + 1;
      loadNextPage(
        page,
        fetchTrendingMovies,
        last,
        movieState.trending.totalPages
      );
      if (page === movieState.trending.totalPages) {
        last = true;
      }
      last ? setDisableNext(true) : setDisableNext(false);
    }
  };

  let errorMessage =
    movieState.details.error ||
    movieState.popular.error ||
    movieState.nowPlaying.error ||
    movieState.trending.error;

  if (errorMessage) {
    errorMessage = <Error />;
  }

  const mediaLoading =
    movieState.popular.loading ||
    movieState.nowPlaying.loading ||
    movieState.trending.loading;

  let movieListing;
  if (!errorMessage && !mediaLoading && filterType === FilterTypes.Popular) {
    movieListing = (
      <AllMediaList
        mediaType={MediaParamTypes.Movie}
        items={movieState.popular.data}
      />
    );
  }
  if (!errorMessage && !mediaLoading && filterType === FilterTypes.NowPlaying) {
    movieListing = (
      <AllMediaList
        mediaType={MediaParamTypes.Movie}
        items={movieState.nowPlaying.data}
      />
    );
  }
  if (!errorMessage && !mediaLoading && filterType === FilterTypes.Trending) {
    movieListing = (
      <AllMediaList
        mediaType={MediaParamTypes.Movie}
        items={movieState.trending.data}
      />
    );
  }

  return (
    <Fragment>
      {mediaLoading && <Loader />}
      {errorMessage}
      <div className="row row-cols-3 row-cols-sm-3 row-cols-md-4 row-cols-lg-4 justify-content-start pt-4">
        {movieListing}
        {!errorMessage && movieListing && (
          <div className="col-12 text-center">
            <Button
              onClick={() => loadPrev(filterType, true)}
              disabled={disablePrev}
            >
              <i className="fa-solid fa-angles-left"></i> First
            </Button>
            <Button onClick={() => loadPrev(filterType)} disabled={disablePrev}>
              <i className="fa-solid fa-chevron-left"></i> Previous
            </Button>
            <Button onClick={() => loadNext(filterType)} disabled={disableNext}>
              Next <i className="fa-solid fa-chevron-right"></i>
            </Button>
            <Button
              onClick={() => loadNext(filterType, true)}
              disabled={disableNext}
            >
              Last <i className="fa-solid fa-angles-right"></i>
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(MovieListing);
