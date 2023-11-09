import React from "react";
import { Link, useParams } from "react-router-dom";
import classes from "../common/MediaItem.module.css";

import { MediaParamTypes } from "../../services/MediaType";
import ScrollerWrapper from "../Layout/ScrollerWrapper";
import CastItem from "./CastItem";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import useDrag from "../Layout/useDrag";

const MediaCast: React.FC<{ mediaType: string; cast: any[] }> = (props) => {
  let cast = props.cast;
  const { mediaId } = useParams();
  let castHeading;
  if (props.mediaType) {
    castHeading =
      props.mediaType === MediaParamTypes.Movie
        ? "Top Billed Cast"
        : "Series Cast";
  }
  const items = cast && cast.slice(0, 10);

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
    <div className="grid-container mt-5">
      <h4 className="py-2">{castHeading}</h4>
      <div className="row">
        {/* <ScrollerWrapper> */}
        
          {items && (
            <ScrollMenu 
              onWheel={onWheel}
              onMouseDown={() => dragStart}
              onMouseUp={() => dragStop}
              onMouseMove={handleDrag}
            >
              {items.map((c) => (
                  <div
                    className="col d-flex pt-4 pb-4 align-items-stretch"
                    key={c.id}
                  >
                    <CastItem item={c} key={c.id} class="w-150" />
                  </div>
              ))}
            </ScrollMenu>
          )}

          {cast && cast.length >= 10 && (
            <div className={`text-center p-5`} >
              <Link
                to={`/${props.mediaType}/${mediaId}/cast`}
                className="text-decoration-none text-dark"
              >
                <h6 style={{ color: '#cecece' }}>
                  View More &nbsp; <i className="fa fa-arrow-right"></i>
                </h6>
              </Link>
            </div>
          )}
            
        {/* </ScrollerWrapper> */}
      </div>
    </div>
  );
};

export default React.memo(MediaCast);
