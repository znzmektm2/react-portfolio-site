import React from "react";
import "./Clients.scss";
import { Scrollbars } from "react-custom-scrollbars";

const Clients = ({ clientsList }) => {
  return (
    <article className="clients">
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
    </article>
  );
};

export default Clients;
