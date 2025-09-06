import api from "./api";
export const signup = (payload) =>
  api.post("/signup", payload).then((r) => r.data);
export const login = (payload) =>
  api.post("/login", payload).then((r) => r.data);
