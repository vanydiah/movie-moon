import React from "react";
import noimage from "../../no-image.png";
import { formatDate } from "../../utilities";
import SocialMediaLinks from "../common/SocialMediaLinks";
import classes from "./Overview.module.css";

const Overview: React.FC<{ data: any }> = (props) => {
  const details = props.data;

  const img_endpoint = "https://image.tmdb.org";
  const img_path = img_endpoint + "/t/p/w300_and_h450_face";
  const thumb = img_endpoint + "/t/p/w220_and_h330_face";
  const backdropPath = img_endpoint + "/t/p/w1000_and_h563_face";

  let backdropImg;
  if (details && details.backdrop_path) {
    backdropImg = {
      backgroundImage: "url(" + backdropPath + details.backdrop_path + " )",
    };
  }

  let VoteBar;
  if (details && details.vote_average) {
    const rating = Math.floor(details.vote_average * 10);
    const ratingNumber = rating / 10;
    VoteBar = (
      // <div className="progress" style={{ height: ".2rem" }}>
      //   <div
      //     className={`progress-bar ${classes["progress-bar"]}`}
      //     role="progressbar"
      //     style={{ width: `${rating}%` }}
      //     aria-valuenow={25}
      //     aria-valuemin={0}
      //     aria-valuemax={100}
      //   ></div>
      // </div>
      <h6 className="rating pt-3">
        <i className="fa-solid fa-star" /> {ratingNumber}
      </h6>
    );
  }

  let release_date;
  if (details && details.release_date) {
    release_date = new Date(details.release_date).getFullYear();
  }
  if (details && details.first_air_date) {
    release_date = new Date(details.first_air_date).getFullYear();
  }
  let genres;
  if (details && details.genres && details.genres.length > 0) {
    genres = (
      <>
        {details.genres.map((g: { name: string; id: number }, i: number) => {
          return (
            <div className="col-auto px-1" key={g.id}>{`${g.name}${
              details.genres.length > i + 1 ? ",  " : ""
            } `}</div>
          );
        })}
      </>
    );
  }

  let hrs, mins, runtime;
  if (details && details.runtime) {
    hrs = Math.floor(details.runtime / 60);
    mins = details.runtime % 60;
  }
  if (hrs && mins) {
    runtime = `${hrs}h ${mins}m`;
  }
  let title;
  if (details && details.title) {
    title = details.title;
  }
  if (details && details.name) {
    title = details.name;
  }
  let createdBy;
  if (details && details.created_by && details.created_by.length > 0) {
    createdBy = (
      <>
        {details.created_by.map(
          (g: { name: string; id: number }, i: number) => {
            return (
              <div className="col" key={g.id}>
                <h6 className="my-0">{g.name}</h6>
                <p className="py-0">Creater</p>
              </div>
            );
          }
        )}
      </>
    );
  }

  return (
    <div className={`${classes.backdrops}`} style={backdropImg}>
      <div className={`${classes.custom_bg}`}>
        <div className="container pt-5">
          <div className={`card-headers pb-5 ${classes["card-headers"]}`}>
            <div className="card-poster">
              {details.poster_path ? (
                <>
                  <img
                    className="img-fluid d-none d-sm-none d-md-block d-lg-block px-0"
                    src={img_path + details.poster_path}
                    alt={details.original_title}
                  />
                  <img
                    className="img-fluid mx-auto d-block d-sm-block d-md-none d-lg-none px-0"
                    src={thumb + details.poster_path}
                    alt={details.original_title}
                  />
                </>
              ) : (
                <img src={noimage} alt={title} />
              )}
            </div>
            <div className="card-content pt-3 pt-sm-3 pt-lg-0 pt-md-0">
              <div className="text-center text-sm-center text-md-start text-lg-start">
                <h2>
                  {title}
                  {release_date && (
                    <span className={classes.release_date}>
                      ({release_date})
                    </span>
                  )}
                </h2>
                <div
                  className={`row justify-content-center justify-content-md-start px-2 pb-0 mb-1 ${classes.genre}`}
                >
                  {release_date && (
                    <div className="col-auto col-sm-auto col-lg-auto px-0">
                      <p className="pb-0 mb-0">
                        &nbsp; {formatDate(`${release_date}`)}
                      </p>
                    </div>
                  )}
                  {genres && (
                    <div
                      className={`col-auto  col-sm-auto col-lg-auto col-md-auto px-0`}
                    >
                      <div
                        className={`row g-0 ${classes.bullet} ${classes.genreItem}`}
                      >
                        {genres}
                      </div>
                    </div>
                  )}
                  {runtime && (
                    <div
                      className={`col-auto col-sm-auto col-lg-auto col-md-auto px-0 ${classes.bullet}`}
                    >
                      {runtime}
                    </div>
                  )}
                </div>
              </div>
              {VoteBar}
              <div className="card-overview mt-3">
                {details.tagline && (
                  <cite className={classes.tagline} title={title}>
                    {details.tagline}
                  </cite>
                )}
                <h5 className={details.tagline ? "pt-2" : ""}>Overview</h5>
                <p className="overview">
                  {details.overview ? details.overview : "Not Available"}
                </p>
              </div>
              {createdBy && (
                <div className="card-overview mt-3 pt-2 ">
                  <div className="row">{createdBy}</div>
                </div>
              )}

              {details && details.socialIds && (
                <div className="card-overview justify-content-start">
                  <SocialMediaLinks
                    links={details.socialIds}
                    color="text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Overview);
