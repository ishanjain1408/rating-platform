import api from "./api";
export const listStores = (params) =>
  api.get("/stores", { params }).then((r) => r.data);
export const createStore = (payload) =>
  api.post("/stores", payload).then((r) => r.data);
export const rateStore = (storeId, payload) =>
  api.post(`/stores/${storeId}/rate`, payload).then((r) => r.data);
export const myStores = () => api.get("/owner/stores").then((r) => r.data);
export const getAdminUsers = (params) =>
  api.get("/admin/users", { params }).then((r) => r.data);
export const getAdminStores = (params) =>
  api.get("/admin/stores", { params }).then((r) => r.data);
export const adminCreateUser = (payload) =>
  api.post("/admin/users", payload).then((r) => r.data);
export const adminCreateStore = (payload) =>
  api.post("/admin/stores", payload).then((r) => r.data);
