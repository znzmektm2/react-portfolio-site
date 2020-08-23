import React from "react";
import styled from "styled-components";

const MenuTextBlock = styled.div`
  overflow: hidden;
  ul {
    transform: translate3d(-100%, 0, 0);
    transition-delay: 0.8s;
    animation: 0.3s ease forwards fadeOut;
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    li {
      position: relative;
      display: inline-block;
      font-family: "trump-gothic-pro";
      color: #c8c9b9;
      font-size: 1.15rem;
      letter-spacing: 0.5px;
      span {
        padding: 0 10px;
      }
    }
  }
`;
const MenuText = React.memo(({ portfolioNumber, designNumber }) => {
  return (
    <MenuTextBlock className="menuText">
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
    </MenuTextBlock>
  );
});

export default MenuText;
