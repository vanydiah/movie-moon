import React, { useState } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const position = document.documentElement.scrollTop;
    if (position > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      {visible && (
        <a
          className="btn btn-dark back-to-top"
          role="button"
          onClick={scrollToTop}
        >
          <i className="fas fa-chevron-up"></i>
        </a>
      )}
    </>
  );
};

export default React.memo(BackToTop);
