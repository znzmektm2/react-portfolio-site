import client from "./client";
import qs from "qs";

export const checkId = (id) => client.get(`/api/portfolios/idCheck/${id}`);

export const writePortFolio = (formData) =>
  client.post("/api/portfolios", formData);

export const updatePortFolio = ({ originalPortfolioId, formData }) =>
  client.patch(`/api/portfolios/${originalPortfolioId}`, formData);
export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);

export const removePortFolio = (id) => client.delete(`/api/portfolios/${id}`);

export const removeClientImageApi = (id) =>
  client.patch(`/api/portfolios/${id}/removeClientImage`);

export const category = () => client.get("/api/portfolios/category");

export const countPortfolio = () =>
  client.get("/api/portfolios/countPortfolio");

export const clients = () => client.get("/api/portfolios/clients");

export const list = ({ skill, web, singlePage, page }) => {
  const queryString = qs.stringify({ skill, web, singlePage, page });
  return client.get(`/api/portfolios?${queryString}`);
};
