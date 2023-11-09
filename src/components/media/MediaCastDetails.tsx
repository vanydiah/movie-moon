import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchCredits, fetchDetails } from "../../services/fetchMedia";
import { CreditTypes, MediaParamTypes } from "../../services/MediaType";
import { RootState } from "../../store";
import { movieAction } from "../../store/movie-slice";
import { tvAction } from "../../store/tv-slice";
import Loader from "../Layout/Loader";
import CastItem from "./CastItem";

const MediaCastDetails = () => {
  const location = useLocation();
  const { mediaId } = useParams();
  const mediaParams = location.pathname.split("/");
  const mediaType = mediaParams[1];
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  let data: any;
  if (mediaType && mediaId) {
    let type = mediaType as keyof typeof state;
    if (mediaType === MediaParamTypes.Movie) {
      type = "movies";
    }
    data = state[type]?.details?.data?.[mediaId];
  }

  useEffect(() => {
    if (!data) {
      console.log("useffect running");
      if (mediaType === MediaParamTypes.Movie) {
        fetchMovieDetails();
      }
      if (mediaType === MediaParamTypes.TV) {
        fetchTVDetails();
      }
    }
  }, []);

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
  }, [mediaId, dispatch, fetchMediaCredits, mediaType]);

  const fetchTVDetails = useCallback(async () => {
    dispatch(tvAction.getTVDetails({ mediaId }));
    const data = await fetchDetails(mediaType, +mediaId!);

    if (!data.success) {
      dispatch(tvAction.getTVDetailsError(data.error));
      return;
    }

    dispatch(tvAction.getTVDetailsSuccess({ mediaId, results: data.results }));

    fetchMediaCredits(mediaId);
  }, [mediaId, mediaType, dispatch, fetchMediaCredits]);

  let release_date;
  if (data && data.release_date) {
    release_date = new Date(data.release_date).getFullYear();
  }
  if (data && data.first_air_date) {
    release_date = new Date(data.first_air_date).getFullYear();
  }
  const mediaLoading = state.movies.details.loading || state.tv.details.loading;
  const title = data?.title ? data?.title : data?.name;

  return (
    <Fragment>
      <div className="container-fluid single-wrapper">
        {data && (
          <>
            <div className="container single-column">
              <div className="inner-content">
                {data?.poster_path && (
                  <span className="d-flex">
                    <Link to={`/${mediaType}/${mediaId}`}>
                      <img
                        className={`img-fluid rounded-top `}
                        src={`https://image.tmdb.org/t/p/w58_and_h87_face/${data?.poster_path}`}
                        alt={title}
                        title={title}
                      />
                    </Link>
                  </span>
                )}
                <span className="d-flex pl-2 header">
                  <div>
                    {title && (
                      <>
                        <h2>
                          <Link
                            to={`/${mediaType}/${mediaId}`}
                            className="text-decoration-none"
                          >
                            {title}{" "}
                            <span className="release_year small">
                              ({release_date})
                            </span>
                          </Link>
                        </h2>
                        <h6>
                          <Link
                            to={`/${mediaType}/${mediaId}`}
                            className="text-decoration-none"
                          >
                            <i className="fa fa-arrow-left"></i> Back to main
                          </Link>
                        </h6>
                      </>
                    )}
                  </div>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {mediaLoading && <Loader />}
      <div className="container">
        {data?.credits?.cast && (
          <>
            <div className="row col pt-4 my-3 justify-content-start series-cast">
              <h4>
                {mediaType === MediaParamTypes.TV ? "Series Cast" : "Cast"}{" "}
                <span className="release_year small">
                  ({data.credits.cast.length})
                </span>
              </h4>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 justify-content-start">
              {data.credits.cast.map((c: any) => (
                <div
                  className="col d-flex pt-4 pb-4 align-items-stretch"
                  key={`${c.id}-${c.cast_id}`}
                >
                  <CastItem item={c} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(MediaCastDetails);
