import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const client = axios.create({
  baseUR: "/",
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
  }),
});

export default client;
