import React, { Fragment } from "react";
import { MediaItemType } from "../../services/MediaType";
import MediaItem from "./MediaItem";

type MediaListType = {
  mediaType?: string;
  items: Array<MediaItemType>;
};

export const AllMediaList: React.FC<MediaListType> = React.memo((props) => {
  const { items } = props;
  return (
    <Fragment>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <div
            className="col d-flex pt-4 pb-4  align-items-stretch"
            key={item.id}
          >
            <MediaItem
              bigPoster={true}
              media_type={props.mediaType}
              {...item}
            />
          </div>
        ))}
    </Fragment>
  );
});
