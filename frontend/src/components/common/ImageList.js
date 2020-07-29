import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ImageList = ({ id, client, src, srcSet, alt, isLazy = false }) => (
  <>
    <li className={isLazy ? "lazy" : ""}>
      <Link to={`/portfolio/${id}`}>
        <div className="barcodeTxt">{id}</div>
        <img
          src={src}
          alt={alt}
          srcSet={isLazy ? "" : srcSet}
          data-srcset={srcSet}
          data-src={src}
        />
        <div className="listText">
          <h3>{id}</h3>
          <h4>{client}</h4>
          <span>VIEW MORE</span>
        </div>
      </Link>
    </li>
  </>
);

ImageList.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageList;
