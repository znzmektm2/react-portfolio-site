import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ImageList = ({ id, client, src, srcSet, alt, isLazy = false }) => (
  <>
    <li className={isLazy ? "lazy" : ""}>
      <Link to={`/portfolio/${id}`}>
        <span>{client}</span>
        <img
          src={src}
          alt={alt}
          srcSet={isLazy ? "" : srcSet}
          data-srcset={srcSet}
          data-src={src}
        />
      </Link>
    </li>
  </>
);

ImageList.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageList;
