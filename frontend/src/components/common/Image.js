import React from "react";
import PropTypes from "prop-types";

const Image = ({ src, alt, isLazy = false }) => {
  return (
    <>
      <img
        className={isLazy ? "lazy" : ""}
        src={src}
        alt={alt}
        data-src={src}
      />
    </>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
