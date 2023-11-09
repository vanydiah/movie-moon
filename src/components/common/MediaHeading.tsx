import { useLocation } from "react-router-dom";
import { FilterTypes, MediaParamTypes } from "../../services/MediaType";

const MediaHeading: React.FC = () => {
  const location = useLocation();
  const params = location.pathname.split("/");
  const mediaType = params[1];
  const filterType = params[2];

  let heading;
  if (mediaType === MediaParamTypes.Movie) {
    if (filterType === FilterTypes.Popular) {
      heading = "Popular Movies";
    }
    if (filterType === FilterTypes.NowPlaying) {
      heading = "Now Playing";
    }
    if (filterType === FilterTypes.Trending) {
      heading = "Trending Movies";
    }
  }
  if (mediaType === MediaParamTypes.TV) {
    if (filterType === FilterTypes.Popular) {
      heading = "Popular TV Shows";
    }
    if (filterType === FilterTypes.Trending) {
      heading = "Trending TV Shows";
    }
  }

  return <h3>{heading}</h3>;
};
export default MediaHeading;
