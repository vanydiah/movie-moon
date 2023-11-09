import React, { Fragment } from "react";
import { MediaState } from "../../services/MediaType";
import { HomeMediaList } from "./HomeMediaList";
import Error from "../Layout/Error";
import Loader from "../Layout/Loader";
import ScrollerWrapper from "../Layout/ScrollerWrapper";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import useDrag from "../Layout/useDrag";

const HomeMediaWrapper: React.FC<{
  mediaType: string;
  mediaHeading: string;
  data: MediaState;
}> = (props) => {
  const { mediaType, mediaHeading, data: item } = props;

  let loading;
  loading = item.loading && <Loader />;

  let errorMessage;
  errorMessage = item.error && <Error />;

  type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) => (
    ev: React.MouseEvent
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isTouchpad) {
      ev.stopPropagation();
      return;
    }
    // if (ev.deltaY < 0) {
    //   apiObj.scrollNext();
    // } else if (ev.deltaY > 0) {
    //   apiObj.scrollPrev();
    // }
  }

  return (
    <Fragment>
      <h3>{mediaHeading}</h3>
      {loading}
      {errorMessage}
      {!loading && !errorMessage && (
        // <ScrollerWrapper>
        <ScrollMenu 
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
        >
          <HomeMediaList mediaType={mediaType} items={item.data} />
        </ScrollMenu>
        // </ScrollerWrapper>
      )}
    </Fragment>
  );
};

export default React.memo(HomeMediaWrapper);
