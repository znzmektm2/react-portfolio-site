import client from "./client";
import qs from "qs";

export const writePortFolio = (formData) =>
  client.post("/api/portfolios", formData);

export const writeFileUpload = (file) =>
  client.post("/api/portfolios/fileUpload", file);

export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);

export const category = () => client.get("/api/portfolios/category");

export const list = ({ skill, web, singlePage }) => {
  const queryString = qs.stringify({ skill, web, singlePage });
  return client.get(`/api/portfolios?${queryString}`);
};
