import client from "./client";
import qs from "qs";

export const writeDesign = (formData) => client.post("/api/design", formData);

export const updateDesign = ({ id, formData }) =>
  client.patch(`/api/design/${id}`, formData);

export const removeDesign = (id) => client.delete(`/api/design/${id}`);

export const category = () => client.get("/api/design/category");

export const countDesign = () => client.get("/api/design/countDesign");

export const list = ({ category, page }) => {
  const queryString = qs.stringify({ category, page });
  return client.get(`/api/design?${queryString}`);
};
