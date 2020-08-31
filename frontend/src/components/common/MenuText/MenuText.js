import React from "react";
import "./MenuText.scss";

const MenuText = React.memo(({ portfolioNumber, designNumber }) => {
  return (
    <div className="menuText">
      <ul>
        <li>
          FRONTEND DEVELOPER<span>·</span>
        </li>
        <li>
          PORTFOLIOS → {portfolioNumber ? portfolioNumber : ""}
          <span>·</span>
        </li>
        <li>
          DESIGN → {designNumber ? designNumber : ""}
          <span>·</span>
        </li>
        <li>LAST UPDATE → AUGUST 2020</li>
      </ul>
    </div>
  );
});

export default MenuText;
