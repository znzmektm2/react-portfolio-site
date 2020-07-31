import client from "./client";
import qs from "qs";

export const checkId = (id) => client.get(`/api/portfolios/idCheck/${id}`);

export const writePortFolio = (formData) =>
  client.post("/api/portfolios", formData);

export const updatePortFolio = ({ originalPortfolioId, data }) =>
  client.patch(`/api/portfolios/${originalPortfolioId}`, data);
export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);

export const removePortFolio = (id) => client.delete(`/api/portfolios/${id}`);

export const category = () => client.get("/api/portfolios/category");

export const list = ({ skill, web, singlePage, page }) => {
  const queryString = qs.stringify({ skill, web, singlePage, page });
  return client.get(`/api/portfolios?${queryString}`);
};
