import React, { Fragment } from "react";
import { MediaItemType } from "../../services/MediaType";
import MediaItem from "../common/MediaItem";

type MediaListType = {
  mediaType?: string;
  items: Array<MediaItemType>;
};

export const HomeMediaList: React.FC<MediaListType> = React.memo((props) => {
  const { items } = props;
  return (
    <Fragment>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <MediaItem media_type={props.mediaType} key={item.id} {...item} />
        ))}
    </Fragment>
  );
});
