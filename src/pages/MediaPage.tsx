import React from "react";
import { useLocation } from "react-router-dom";

import { MediaParamTypes } from "../services/MediaType";
import MediaHeading from "../components/common/MediaHeading";
import MovieListing from "../components/media/MovieListing";
import TVListing from "../components/media/TVListing";

const MediaPage: React.FC = () => {
  const location = useLocation();
  const mediaParams = location.pathname.split("/");
  const mediaType = mediaParams[1];

  return (
    <div className="container py-4">
      <MediaHeading />

      {mediaType === MediaParamTypes.Movie && <MovieListing />}
      {mediaType === MediaParamTypes.TV && <TVListing />}
    </div>
  );
};

export default React.memo(MediaPage);
