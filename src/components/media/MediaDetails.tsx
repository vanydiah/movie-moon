import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchCredits, fetchDetails } from "../../services/fetchMedia";
import { CreditTypes, MediaParamTypes } from "../../services/MediaType";
import { RootState } from "../../store";
import { movieAction } from "../../store/movie-slice";
import { tvAction } from "../../store/tv-slice";
import Loader from "../Layout/Loader";
import MediaCast from "./MediaCast";
import Overview from "./Overview";

const MediaDetails: React.FC = () => {
  const location = useLocation();
  const { mediaId } = useParams();
  const mediaParams = location.pathname.split("/");
  const mediaType = mediaParams[1];
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    if (
      mediaType === MediaParamTypes.Movie &&
      !state.movies.details.data[mediaId!]
    ) {
      fetchMovieDetails();
    }
    if (mediaType === MediaParamTypes.TV && !state.tv.details.data[mediaId!]) {
      fetchTVDetails();
    }
  }, [mediaId, mediaType]);

  const fetchMediaCredits = useCallback(
    async (mediaId) => {
      if (mediaType === MediaParamTypes.Movie) {
        dispatch(movieAction.getMovieCredits({ mediaId }));
      }
      if (mediaType === MediaParamTypes.TV) {
        dispatch(tvAction.getTVCredits({ mediaId }));
      }

      const data = await fetchCredits(mediaType, mediaId, CreditTypes.Credit);

      if (!data.success) {
        if (mediaType === MediaParamTypes.Movie) {
          dispatch(movieAction.getMovieCreditsError());
        }
        if (mediaType === MediaParamTypes.TV) {
          dispatch(tvAction.getTVCreditsError());
        }
        return;
      }

      if (mediaType === MediaParamTypes.Movie) {
        dispatch(
          movieAction.getMovieCreditsSuccess({ mediaId, results: data.results })
        );
      }
      if (mediaType === MediaParamTypes.TV) {
        dispatch(
          tvAction.getTVCreditsSuccess({ mediaId, results: data.results })
        );
      }
    },
    [dispatch, mediaType]
  );

  const fetchSocialIds = useCallback(
    async (mediaId: number) => {
      if (mediaType === MediaParamTypes.Movie) {
        dispatch(movieAction.getSocialDetails({ mediaId }));
      }
      if (mediaType === MediaParamTypes.TV) {
        dispatch(tvAction.getSocialDetails({ mediaId }));
      }
      const data = await fetchCredits(
        mediaType === MediaParamTypes.Movie
          ? MediaParamTypes.Movie
          : MediaParamTypes.TV,
        mediaId!,
        CreditTypes.ExternalId
      );

      if (!data.success) {
        if (mediaType === MediaParamTypes.Movie) {
          dispatch(movieAction.getSocialDetailsError());
        }
        if (mediaType === MediaParamTypes.TV) {
          dispatch(tvAction.getSocialDetailsError());
        }
        return;
      }

      if (mediaType === MediaParamTypes.Movie) {
        dispatch(
          movieAction.getSocialDetailsSuccess({
            mediaId,
            results: data.results,
          })
        );
      }
      if (mediaType === MediaParamTypes.TV) {
        dispatch(
          tvAction.getSocialDetailsSuccess({ mediaId, results: data.results })
        );
      }
    },
    [mediaType, dispatch]
  );

  const fetchMovieDetails = useCallback(async () => {
    dispatch(movieAction.getMovieDetails({ mediaId }));

    const data = await fetchDetails(mediaType, +mediaId!);

    if (!data.success) {
      dispatch(movieAction.getMovieDetailsError(data.error));
      return;
    }

    dispatch(
      movieAction.getMovieDetailsSuccess({ mediaId, results: data.results })
    );

    fetchMediaCredits(mediaId);
    fetchSocialIds(+mediaId!);
  }, [mediaId, dispatch, fetchMediaCredits, fetchSocialIds, mediaType]);

  const fetchTVDetails = useCallback(async () => {
    dispatch(tvAction.getTVDetails({ mediaId }));
    const data = await fetchDetails(mediaType, +mediaId!);

    if (!data.success) {
      dispatch(tvAction.getTVDetailsError(data.error));
      return;
    }

    dispatch(tvAction.getTVDetailsSuccess({ mediaId, results: data.results }));

    fetchMediaCredits(mediaId);
    fetchSocialIds(+mediaId!);
  }, [mediaId, mediaType, dispatch, fetchMediaCredits, fetchSocialIds]);

  let mediaDetails;
  let mediaDetailsLoading;
  if (mediaType === MediaParamTypes.Movie) {
    mediaDetailsLoading = state.movies.details.loading;
    mediaDetails = state.movies.details.data[mediaId!];
  }
  if (mediaType === MediaParamTypes.TV) {
    mediaDetailsLoading = state.tv.details.loading;
    mediaDetails = state.tv.details.data[mediaId!];
  }

  return (
    <Fragment>
      {mediaDetailsLoading && <Loader />}
      {!mediaDetailsLoading && mediaDetails && (
        <>
          <div className="container-fluid px-0 mx-0 pt-0 mt-0">
            <Overview data={mediaDetails} />
          </div>
          <div className="container">
            {mediaDetails.hasOwnProperty("credits") &&
            mediaDetails.credits.hasOwnProperty("cast") &&
            mediaDetails.credits.cast.length === 0 ? (
              <p>Cast not availble</p>
            ) : (
              <MediaCast
                mediaType={mediaType}
                cast={mediaDetails.credits.cast}
              />
            )}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default React.memo(MediaDetails);
