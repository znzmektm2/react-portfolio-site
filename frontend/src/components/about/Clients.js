import React from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";

const ClientsBlock = styled.article`
  position: relative;
  padding: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #000;
  box-sizing: border-box;

  h2 {
    span {
      color: #222;
      background: #fff;
    }
  }
  .content {
    border: 1px solid #222;
    .clientsList {
      display: flex;
      flex-direction: column-reverse;
      width: 96%;
      height: 100%;
      overflow: hidden;
      .scrollBars {
        text-align: left;
        ul {
          li {
            margin-bottom: 1.1rem;
            width: 16.666%;
            display: inline-block;
            font-size: 0;
            line-height: 0;
            text-align: center;
            a {
              width: 94%;
              overflow: hidden;
              img {
                opacity: 0;
                transition: 3s cubic-bezier(0.165, 0.84, 0.44, 1);
              }
            }
            &.active {
              a {
                img {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Clients = ({ clientsList }) => {
  return (
    <ClientsBlock className="clients">
      <div className="content">
        <h2>
          <span>Clients</span>
        </h2>
        <div className="clientsList">
          <Scrollbars className="scrollBars" style={{ height: "100%" }}>
            <ul>
              {clientsList &&
                clientsList.map((c) => (
                  <li key={c.clientImage.name}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      <img src={c.clientImage.url} alt={c.clientImage.name} />
                    </a>
                  </li>
                ))}
            </ul>
          </Scrollbars>
        </div>
      </div>
    </ClientsBlock>
  );
};

export default Clients;
