import React from "react";
import styled from "styled-components";
import Arrow from "./Arrow";

const TitleBlock = styled.div`
  @keyframes move {
    0%   {transform: translateY(-55%);}
    50%  {transform: translateY(0%);}
    100% {transform: translateY(-55%);}
  }

  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
  min-height: 520px;
  text-align: center;
  background: #fff;
  z-index: 1;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
    box-sizing: border-box;

    h3 {
      margin-top: -3rem;
      position:relative;
      font-family: "trump-gothic-pro";
      font-size: 4.3rem;
      line-height: 5.3rem;
      letter-spacing:calc(1px + 0.01vw);
      font-style: italic;
    }

    h2 {
      font-family: "KoPub Batang",serif;
      font-size: 11rem;
      line-height: 14rem;
      font-weight:bold;
    }

    .scroll {
      position:absolute;
      left:0;
      bottom: calc(1.5rem + 0.2vw);
      display:flex;
      justify-content:center;
      flex-direction:column;
      width: 100%;
      animation: move 1.8s ease-in-out infinite;
    }

    .scroll span {
      font-family:"trump-gothic-pro";
      font-size:calc(15px + 0.3vw);
      line-height:calc(12px + 0.3vw);
      letter-spacing:0.01rem;
    }

    .scroll > div {
      display:inline-block;
      line-height:0;
    }

    .scroll > div svg{
      width:calc(15px + 0.3vw);
    }

    .scroll > div svg path{
      fill: #373646;
    }

    @media screen and (max-width: 640px){
      h3{
        font-size: 4.1rem;
      }

      h2{
        font-size: 7rem;
        line-height:9rem;
      }

      .scroll{
        bottom:3rem;
      }

      .scroll span{
        line-height:calc(6px + 0.3vw);
      }
    }
  }

  
`;

const PageTitle = (props) => {
  return (
    <TitleBlock className="pageTitle">
      <div>
        <h3>{props.subTitle}</h3>
        <h2>{props.title}</h2>
        {
          (props.title === "ABOUT" || props.title === "PORTFOLIOS" || props.title === "DESIGN") && 
          <div className="scroll">
            <span>SCROLL</span>
            <div><Arrow /></div>
          </div>
        }
      </div>
    </TitleBlock>
  );
};

export default PageTitle;
