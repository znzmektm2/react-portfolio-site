import client from "./client";
import qs from "qs";

export const checkId = (id) => client.get(`/api/portfolios/idCheck/${id}`);

export const writePortFolio = (formData) => {
  for (var pair of formData.entries()) {
    console.log("value 3--- ", pair[0] + ", " + pair[1]);
  }

  return client.post("/api/portfolios", formData);
};

export const updatePortFolio = ({ originalPortfolioId, formData }) => {
  for (var pair of formData.entries()) {
    console.log("value 3--- ", pair[0] + ", " + pair[1]);
  }

  return client.patch(`/api/portfolios/${originalPortfolioId}`, formData);
};
export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);

export const removePortFolio = (id) => client.delete(`/api/portfolios/${id}`);

export const category = () => client.get("/api/portfolios/category");

export const list = ({ skill, web, singlePage, page }) => {
  const queryString = qs.stringify({ skill, web, singlePage, page });
  return client.get(`/api/portfolios?${queryString}`);
};
