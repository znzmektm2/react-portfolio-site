import client from "./client";
import qs from "qs";

export const writePortFolio = ({ id }) =>
  client.post("/api/portfolios", { id });

export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);

export const category = () => client.get("/api/portfolios/category");

export const list = ({ skill, web, singlePage }) => {
  const queryString = qs.stringify({ skill, web, singlePage });
  return client.get(`/api/portfolios?${queryString}`);
};
