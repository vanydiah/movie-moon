import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

function Arrow({
  children,
  disabled,
  onClick
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none"
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleElements,
    initComplete
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
    VisibilityContext
  );

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}
