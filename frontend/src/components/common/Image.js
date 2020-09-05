import React from "react";
import PropTypes from "prop-types";
import ImageFilter from "react-image-filter";

const Image = ({ src, alt, isLazy = false, design, index }) => {
  return (
    <>
      {design ? (
        navigator.userAgent.match(/Trident\/7\./) ? (
          <div className={isLazy ? "lazy" : ""}>
            <ImageFilter
              image={src}
              alt={alt}
              data-src={src}
              filter={"grayscale"}
            />
          </div>
        ) : (
          <div className={isLazy ? "lazy" : ""}>
            <div>
              <img src={src} alt={alt} data-src={src} />
            </div>
          </div>
        )
      ) : (
        <img
          className={isLazy ? "lazy" : ""}
          src={src}
          data-src={src}
          alt={alt}
        />
      )}
    </>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
