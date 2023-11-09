import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchMedia, fetchTrending } from "../../services/fetchMedia";
import { FilterTypes, MediaParamTypes } from "../../services/MediaType";
import { RootState } from "../../store";
import { tvAction } from "../../store/tv-slice";
import { loadNextPage, loadPrevPage } from "../../utilities";
import { AllMediaList } from "../common/AllMediaListing";
import Button from "../Layout/Button";
import Error from "../Layout/Error";
import Loader from "../Layout/Loader";

const TVListing: React.FC = () => {
  const location = useLocation();
  const mediaParams = location.pathname.split("/");
  const filterType = mediaParams[2];

  const dispatch = useDispatch();
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const tvState = useSelector((state: RootState) => state.tv);

  useEffect(() => {
    if (
      filterType === FilterTypes.Popular &&
      tvState.popular.data.length === 0
    ) {
      fetchPopularTV();
      setDisablePrev(true);
    } else {
      tvState.popular.page > 1 &&
        tvState.popular.totalPages !== 1 &&
        fetchPopularTV(1);
      setDisableNext(false);
    }
    if (
      filterType === FilterTypes.Trending &&
      tvState.trending.data.length === 0
    ) {
      fetchTrendingTV();
      setDisablePrev(true);
    } else {
      tvState.trending.page > 1 &&
        tvState.trending.totalPages !== 1 &&
        fetchTrendingTV(1);
      setDisableNext(false);
    }
  }, [filterType]);

  const fetchPopularTV = useCallback(async (page: number = 1) => {
    dispatch(tvAction.getPopularTV({ page }));
    const data = await fetchMedia(
      MediaParamTypes.TV,
      FilterTypes.Popular,
      page
    );
    if (!data.success) {
      dispatch(tvAction.getPopularTVError(data.error));
      return;
    }

    dispatch(tvAction.getPopularTVSuccess(data.results));
  }, []);

  const fetchTrendingTV = useCallback(async (page: number = 1) => {
    dispatch(tvAction.getTrendingTV({ page }));
    const data = await fetchTrending(MediaParamTypes.TV, page);
    if (!data.success) {
      dispatch(tvAction.getTrendingTVError(data.error));
      return;
    }

    dispatch(tvAction.getTrendingTVSuccess(data.results));
  }, []);

  const loadPrev = (filterType: string, first: boolean = false) => {
    if (filterType === FilterTypes.Popular) {
      let page = tvState.popular.page;
      loadPrevPage(page, fetchPopularTV, first);
      first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
      page - 1 < tvState.popular.totalPages && setDisableNext(false);
    }

    if (filterType === FilterTypes.Trending) {
      let page = tvState.trending.page;
      loadPrevPage(page, fetchTrendingTV, first);
      first || page - 1 === 1 ? setDisablePrev(true) : setDisablePrev(false);
      page - 1 < tvState.trending.totalPages && setDisableNext(false);
    }
  };

  const loadNext = (filterType: string, last: boolean = false) => {
    setDisablePrev(false);
    if (filterType === FilterTypes.Popular) {
      const page = tvState.popular.page + 1;
      loadNextPage(page, fetchPopularTV, last, tvState.popular.totalPages);
      if (page === tvState.popular.totalPages) {
        last = true;
      }
      last ? setDisableNext(true) : setDisableNext(false);
    }

    if (filterType === FilterTypes.Trending) {
      const page = tvState.trending.page + 1;
      loadNextPage(page, fetchTrendingTV, last, tvState.trending.totalPages);
      if (page === tvState.trending.totalPages) {
        last = true;
      }
      last ? setDisableNext(true) : setDisableNext(false);
    }
  };

  let errorMessage =
    tvState.details.error || tvState.popular.error || tvState.trending.error;

  if (errorMessage) {
    errorMessage = <Error />;
  }

  const mediaLoading = tvState.popular.loading || tvState.trending.loading;

  let tvListing;
  if (!errorMessage && filterType === FilterTypes.Popular && !mediaLoading) {
    tvListing = (
      <AllMediaList
        mediaType={MediaParamTypes.TV}
        items={tvState.popular.data}
      />
    );
  }
  if (!errorMessage && filterType === FilterTypes.Trending && !mediaLoading) {
    tvListing = (
      <AllMediaList
        mediaType={MediaParamTypes.TV}
        items={tvState.trending.data}
      />
    );
  }
  return (
    <Fragment>
      {mediaLoading && <Loader />}
      {errorMessage}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 justify-content-start pt-4">
        {tvListing}
        {!errorMessage && tvListing && (
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

export default React.memo(TVListing);
