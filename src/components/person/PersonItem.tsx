import React from "react";
import { Link } from "react-router-dom";
import { PersonItemType } from "../../services/MediaType";
import classes from "../common/MediaItem.module.css";
import noimage from "../../no-image.png";

const MediaItem: React.FC<PersonItemType> = (props) => {
  let { id, name: personTitle, profile_path } = props;

  const imbBasePath = "https://image.tmdb.org/t/p/w200";
  const image = profile_path ? imbBasePath + profile_path : noimage;

  return (
    <div className={`card ${classes.cardItem} ${classes.cardItemNoBorder}`}>
      <Link to={`/person/${id}`}>
        <img
          className={`img-fluid rounded-top ${classes.cardImageW250} ${
            !profile_path && classes["no-image"]
          }`}
          src={image}
          alt={personTitle}
          title={personTitle}
        />
      </Link>

      <div className={`card-body ${classes.cardBody}`}>
        <Link
          to={`/person/${id}`}
          className="text-decoration-none text-dark bold"
        >
          <h6>{personTitle}</h6>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(MediaItem);
