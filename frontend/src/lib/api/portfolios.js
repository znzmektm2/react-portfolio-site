import client from "./client";

export const writePortFolio = ({ id }) =>
  client.post("/api/portfolios", { id });

export const readPortFolio = (id) => client.get(`/api/portfolios/${id}`);
