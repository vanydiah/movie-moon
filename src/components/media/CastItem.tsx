import React from "react";
import classes from "../common/MediaItem.module.css";
import noimage from "../../no-image.png";
import { Link } from "react-router-dom";

const CastItem: React.FC<{ item: any; class?: string }> = (props) => {
  const imbBasePath = "https://image.tmdb.org/t/p/w200";
  const image = props.item.profile_path
    ? imbBasePath + props.item.profile_path
    : noimage;
  const personTitle = props.item.name;
  return (
    <div
      className={`card ${classes.cardItem} ${props.class} ${classes.cardItemNoBorder}`}
    >
      <Link to={`/person/${props.item.id}`}>
        <img
          className={`img-fluid rounded-top ${classes.cardImageW250} ${
            !props.item.profile_path && classes["no-image"]
          }`}
          src={image}
          alt={personTitle}
          title={personTitle}
        />
      </Link>

      <div className={`card-body ${classes.cardBody}`}>
        <Link
          to={`/person/${props.item.id}`}
          className="text-decoration-none text-dark bold"
        >
          <h6 className="mb-1">{personTitle}</h6>
        </Link>
        <p className="pb-0 mb-0">{props.item.character}</p>
      </div>
    </div>
  );
};

export default CastItem;
